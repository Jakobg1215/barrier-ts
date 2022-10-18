import { Buffer } from 'node:buffer';
import { constants, createCipheriv, createDecipheriv, createHash, privateDecrypt, randomBytes } from 'node:crypto';
import { get } from 'node:https';
import { URL } from 'node:url';
import type BarrierTs from '../BarrierTs';
import Chat, { ChatType } from '../types/classes/Chat';
import UUID from '../types/classes/UUID';
import Player from '../world/entities/Player';
import type Connection from './Connection';
import GamePacketListener from './GamePacketListener';
import type PacketListener from './PacketListener';
import { ConnectionProtocol } from './protocol/ConnectionProtocol';
import ClientBoundGameProfilePacket from './protocol/login/ClientBoundGameProfilePacket';
import ClientBoundHelloPacket from './protocol/login/ClientBoundHelloPacket';
import GameProfile, { property } from './protocol/login/GameProfile';
import type ServerBoundCustomQueryPacket from './protocol/login/ServerBoundCustomQueryPacket';
import type ServerBoundHelloPacket from './protocol/login/ServerBoundHelloPacket';
import type ServerBoundKeyPacket from './protocol/login/ServerBoundKeyPacket';

export default class LoginPacketListener implements PacketListener {
    private static readonly MAX_TICKS_BEFORE_LOGIN = 600;
    private readonly nonce = randomBytes(4);
    private tickCount = 0;
    private state = State.HELLO;
    public publicKeyData: { expiresAt: bigint; publicKey: Buffer; keySignature: Buffer } | null = null;
    private gameProfile!: GameProfile;

    public constructor(private readonly server: BarrierTs, private readonly connection: Connection) {}

    public tick(): void {
        if (this.state === State.READY_TO_ACCEPT) {
            this.loginPlayer();
        }

        if (this.tickCount++ > LoginPacketListener.MAX_TICKS_BEFORE_LOGIN) {
            this.connection.disconnect(new Chat(ChatType.TRANSLATE, 'multiplayer.disconnect.slow_login'));
        }
    }

    private loginPlayer(): void {
        this.state = State.ACCEPTED;
        if (this.server.config.compression >= 0) this.connection.enableCompression(this.server.config.compression);
        this.connection.send(new ClientBoundGameProfilePacket(this.gameProfile));
        this.connection.setProtocol(ConnectionProtocol.PLAY);
        const player = new Player(this.server, this.gameProfile);
        const gamelistener = new GamePacketListener(this.server, player, this.connection);
        this.connection.setListener(gamelistener);
        this.server.playerManager.players.set(this.connection, player);
        this.server.playerManager.loginPlayer(gamelistener);
    }

    public handleHello(hello: ServerBoundHelloPacket): void {
        if (this.state !== State.HELLO) throw new Error('Unexpected hello packet');
        this.gameProfile = new GameProfile(hello.name, hello.profileId || undefined);
        if (this.server.config.online) {
            if (hello.expiresAt || hello.publicKey || hello.keySignature) {
                this.publicKeyData = {
                    expiresAt: hello.expiresAt!,
                    publicKey: hello.publicKey!,
                    keySignature: hello.keySignature!,
                };
            }
            this.state = State.KEY;
            this.connection.send(new ClientBoundHelloPacket('', this.server.playerManager.padLock.publicKey, this.nonce));
        } else {
            this.state = State.READY_TO_ACCEPT;
        }
    }

    public handleKey(key: ServerBoundKeyPacket): void {
        if (this.state !== State.KEY) throw new Error('Unexpected key packet');
        const privateKey = this.server.playerManager.padLock.privateKey;

        const secretkey = privateDecrypt({ key: privateKey, padding: constants.RSA_PKCS1_PADDING }, key.keybytes);

        const encrypt = createCipheriv('aes-128-cfb8', secretkey, secretkey);
        const decrypt = createDecipheriv('aes-128-cfb8', secretkey, secretkey);
        this.connection.enableEncryption(encrypt, decrypt);

        this.state = State.AUTHENTICATING;

        let hash = createHash('sha1').update('').update(secretkey).update(this.server.playerManager.padLock.publicKey).digest();

        const isNegative = (hash.readUInt8(0) & (1 << 7)) !== 0;

        if (isNegative) {
            const inverted = Buffer.allocUnsafe(hash.length);
            let carry = 0;
            for (let i = hash.length - 1; i >= 0; i--) {
                let num = hash.readUInt8(i) ^ 0b11111111;
                if (i === hash.length - 1) num++;
                num += carry;
                carry = Math.max(0, num - 0b11111111);
                num = Math.min(0b11111111, num);
                inverted.writeUInt8(num, i);
            }
            hash = inverted;
        }

        let result = hash.toString('hex').replace(/^0+/, '');

        if (isNegative) result = `-${result}`;

        let data = Buffer.allocUnsafe(0);

        get(
            new URL(
                `https://sessionserver.mojang.com/session/minecraft/hasJoined?username=${encodeURIComponent(
                    this.gameProfile.name,
                )}&serverId=${encodeURIComponent(result)}`,
            ),
            (res) => {
                res.on('data', (playerInfo: Buffer): void => {
                    try {
                        data = Buffer.concat([data, playerInfo]);
                        const resData: Responce = JSON.parse(data.toString());
                        this.gameProfile = new GameProfile(resData.name, new UUID(resData.id));
                        for (let index = 0; index < resData.properties.length; index++)
                            this.gameProfile.properties.push(resData.properties.at(index) as property);

                        this.state = State.READY_TO_ACCEPT;
                    } catch {}
                });

                if (res.statusCode === 204) {
                    this.connection.disconnect(new Chat(ChatType.TRANSLATE, 'multiplayer.disconnect.unverified_username'));
                }

                if (res.statusCode === 502) {
                    this.connection.disconnect(new Chat(ChatType.TRANSLATE, 'multiplayer.disconnect.authservers_down'));
                }
            },
        );
    }

    public handleCustomQueryPacket(_customQueryPacket: ServerBoundCustomQueryPacket): void {
        this.connection.disconnect(new Chat(ChatType.TRANSLATE, 'multiplayer.disconnect.unexpected_query_response'));
    }
}

enum State {
    HELLO,
    KEY,
    AUTHENTICATING,
    READY_TO_ACCEPT,
    ACCEPTED,
}

interface Responce {
    id: string;
    name: string;
    properties: {
        name: string;
        value: string;
        signature: string;
    }[];
}
