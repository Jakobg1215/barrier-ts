import { Buffer } from 'node:buffer';
import { constants, createHash, privateDecrypt } from 'node:crypto';
import { get } from 'node:https';
import { URL } from 'node:url';
import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import ClientboundGameProfilePacket from '../../packets/login/ClientboundGameProfilePacket';
import ClientboundLoginCompressionPacket from '../../packets/login/ClientboundLoginCompressionPacket';
import type ServerboundKeyPacket from '../../packets/login/ServerboundKeyPacket';
import type Handler from '../Handler';

export default class KeyHandler implements Handler<ServerboundKeyPacket> {
    public hander(packet: ServerboundKeyPacket, connection: Connection, server: BarrierTs): void {
        const nonce = privateDecrypt(
            {
                key: `-----BEGIN RSA PRIVATE KEY-----\n${server.padLock.privateKey.toString(
                    'base64',
                )}\n-----END RSA PRIVATE KEY-----`,
                padding: constants.RSA_PKCS1_PADDING,
            },
            packet.nonce,
        );

        if (Buffer.compare(nonce, connection.nonce) !== 0) return connection.disconnect();

        const performTwosCompliment = (buffer: Buffer): void => {
            let carry: boolean = true;
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

        const key: Buffer = privateDecrypt(
            {
                key: `-----BEGIN RSA PRIVATE KEY-----\n${server.padLock.privateKey.toString(
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
                        .update(server.config.serverId)
                        .update(key)
                        .update(server.padLock.publicKey)
                        .digest('hex'),
                    'hex',
                ),
            ),
        );

        get(
            new URL(
                `https://sessionserver.mojang.com/session/minecraft/hasJoined?username=${encodeURIComponent(
                    connection.name!,
                )}&serverId=${hash}&id=127.0.0.1`,
            ),
            Responce => {
                if (Responce.statusCode !== 200) {
                    connection.disconnect();
                }
                Responce.on('data', data => {
                    connection.setKey(key);
                    const playerdata: MojangResponce = JSON.parse(data.toString());
                    connection.createPlayer({ name: playerdata.name, uuid: playerdata.id });
                    connection.player?.setProperties(playerdata.properties);
                    connection.enableEncryption();
                    if (server.config.compression > 0) {
                        connection.send(new ClientboundLoginCompressionPacket(server.config.compression));
                        connection.enableCompression();
                    }
                    connection.send(new ClientboundGameProfilePacket(connection.player?.gameProfile!));
                });
            },
        );
    }
}

interface MojangResponce {
    id: string;
    name: string;
    properties: object[];
}
