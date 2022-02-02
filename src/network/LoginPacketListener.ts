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
    private static readonly MAX_TICKS_BEFORE_LOGIN = 300;
    private readonly nonce = randomBytes(4);
    private tickCount = 0;
    private state = State.HELLO;
    private gameProfile: GameProfile | null = null;

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
        if (!this.gameProfile?.isComplete()) {
            this.gameProfile = new GameProfile(
                UUID.createFakeUUID(`OfflinePlayer:${this.gameProfile?.name}`),
                this.gameProfile?.name!,
            );
        }

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
        this.gameProfile = hello.gameProfile;
        if (this.server.config.online) {
            this.state = State.KEY;
            this.connection.send(
                new ClientBoundHelloPacket(
                    this.server.config.serverId,
                    this.server.playerManager.padLock.publicKey,
                    this.nonce,
                ),
            );
        } else {
            this.state = State.READY_TO_ACCEPT;
        }
    }

    public handleKey(key: ServerBoundKeyPacket): void {
        if (this.state !== State.KEY) throw new Error('Unexpected hello packet');
        const privateKey = this.server.playerManager.padLock.privateKey;

        const nonce = privateDecrypt({ key: privateKey, padding: constants.RSA_PKCS1_PADDING }, key.nonce);

        if (Buffer.compare(nonce, this.nonce) !== 0) throw Error('Protocol error');

        const secretkey = privateDecrypt({ key: privateKey, padding: constants.RSA_PKCS1_PADDING }, key.keybytes);

        const encrypt = createCipheriv('aes-128-cfb8', secretkey, secretkey);
        const decrypt = createDecipheriv('aes-128-cfb8', secretkey, secretkey);
        this.connection.enableEncryption(encrypt, decrypt);

        this.state = State.AUTHENTICATING;

        const performTwosCompliment = (buffer: Buffer): void => {
            let carry = true;
            let i: number, newByte: number, value: number;
            for (i = buffer.length - 1; i >= 0; --i) {
                value = buffer.readUInt8(i);
                newByte = ~value & 0xff;
                if (carry) {
                    carry = newByte === 0xff;
                    buffer.writeUInt8(carry ? 0 : newByte + 1, i);
                } else {
                    buffer.writeUInt8(newByte, i);
                }
            }
        };

        const mcHexDigest = (hash: Buffer): string => {
            const negative: boolean = hash.readInt8(0) < 0;
            if (negative) performTwosCompliment(hash);
            return (negative ? '-' : '') + hash.toString('hex').replace(/^0+/g, '');
        };

        const hash = mcHexDigest(
            createHash('sha1')
                .update(this.server.config.serverId)
                .update(secretkey)
                .update(this.server.playerManager.padLock.publicKey)
                .digest(),
        );

        get(
            new URL(
                `https://sessionserver.mojang.com/session/minecraft/hasJoined?username=${encodeURIComponent(
                    this.gameProfile!.name,
                )}&serverId=${encodeURIComponent(hash)}`,
            ),
            res => {
                res.on('data', (data: Buffer): void => {
                    const resData: Responce = JSON.parse(data.toString());
                    this.gameProfile = new GameProfile(new UUID(resData.id), resData.name);
                    for (let index = 0; index < resData.properties.length; index++)
                        this.gameProfile.properties.push(resData.properties.at(index) as property);

                    this.state = State.READY_TO_ACCEPT;
                });

                if (res.statusCode === 204) {
                    this.connection.disconnect(
                        new Chat(ChatType.TRANSLATE, 'multiplayer.disconnect.unverified_username'),
                    );
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
