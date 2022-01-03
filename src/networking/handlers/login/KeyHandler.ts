import { Buffer } from 'node:buffer';
import { constants, createHash, privateDecrypt } from 'node:crypto';
import { get } from 'node:https';
import { URL } from 'node:url';
import type BarrierTs from '../../../BarrierTs';
import Chat from '../../../types/classes/Chat';
import type { property } from '../../../types/GameProfile';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundKeyPacket from '../../packets/login/ServerboundKeyPacket';
import type Handler from '../Handler';

export default class KeyHandler implements Handler<ServerboundKeyPacket> {
    public hander(packet: ServerboundKeyPacket, player: Player, server: BarrierTs): void {
        const nonce = privateDecrypt(
            {
                key: `-----BEGIN RSA PRIVATE KEY-----\n${server.playerManager.padLock.privateKey.toString(
                    'base64',
                )}\n-----END RSA PRIVATE KEY-----`,
                padding: constants.RSA_PKCS1_PADDING,
            },
            packet.nonce,
        );

        if (Buffer.compare(nonce, player.connection.nonce) !== 0)
            return player.connection.disconnect(new Chat().addTranslate('multiplayer.disconnect.generic', new Chat()));

        const performTwosCompliment = (buffer: Buffer) => {
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

        const mcHexDigest = (hash: Buffer) => {
            const negative: boolean = hash.readInt8(0) < 0;
            if (negative) performTwosCompliment(hash);
            return (negative ? '-' : '') + hash.toString('hex').replace(/^0+/g, '');
        };

        const key: Buffer = privateDecrypt(
            {
                key: `-----BEGIN RSA PRIVATE KEY-----\n${server.playerManager.padLock.privateKey.toString(
                    'base64',
                )}\n-----END RSA PRIVATE KEY-----`,
                padding: constants.RSA_PKCS1_PADDING,
            },
            packet.keybytes,
        );

        const hash = encodeURIComponent(
            mcHexDigest(
                Buffer.from(
                    createHash('sha1')
                        .update(server.config.serverId.length > 20 ? '' : server.config.serverId)
                        .update(key)
                        .update(server.playerManager.padLock.publicKey)
                        .digest('hex'),
                    'hex',
                ),
            ),
        );

        get(
            new URL(
                `https://sessionserver.mojang.com/session/minecraft/hasJoined?username=${encodeURIComponent(
                    player.playerGameProfile.name,
                )}&serverId=${hash}`,
            ),
            Responce => {
                if (Responce.statusCode === 204) {
                    player.connection.disconnect(
                        new Chat().addTranslate('multiplayer.disconnect.unverified_username', new Chat()),
                    );
                }

                if (Responce.statusCode === 502) {
                    player.connection.disconnect(
                        new Chat().addTranslate('multiplayer.disconnect.authservers_down', new Chat()),
                    );
                }

                Responce.on('data', data => {
                    player.connection.setKey(key);
                    const playerdata: MojangResponce = JSON.parse(data.toString());
                    player.connection.enableEncryption();
                    player.connection.enableCompression();
                    player.playerGameProfile.name = playerdata.name;
                    player.playerGameProfile.uuid = playerdata.id;
                    player.playerGameProfile.properties = playerdata.properties;
                    player.login();
                });
            },
        );
    }
}

interface MojangResponce {
    id: string;
    name: string;
    properties: property[];
}
