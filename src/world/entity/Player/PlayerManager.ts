import { generateKeyPairSync, randomBytes } from 'node:crypto';
import type Connection from '../../../networking/Connection';
import type ClientboundPacket from '../../../networking/packets/ClientbountPacket';
import { ProtocolState } from '../../../networking/Protocol';
import type Player from './Player';

export default class PlayerManager {
    public readonly players = new Map<Connection, Player>();
    public readonly padLock = generateKeyPairSync('rsa', {
        modulusLength: 1024,
        publicKeyEncoding: {
            type: 'spki',
            format: 'der',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'der',
        },
    });
    public keepAliveId = randomBytes(8);

    public constructor() {
        /*
        setInterval(() => {
            this.sendAll(new ClientboundKeepAlivePacket(this.keepAliveId.readBigInt64BE()));
            this.keepAliveId = randomBytes(8);
        }, 15000);*/
    }

    public sendAll(data: ClientboundPacket, ...execlude: number[]) {
        this.players.forEach(player => {
            if (execlude.includes(player.id)) return;
            if (player.connection.protocolState !== ProtocolState.PLAY) return;
            player.connection.send(data);
        });
    }

    public getOnlinePlayers() {
        const players: Player[] = [];
        this.players.forEach(player => {
            if (player.connection.protocolState === ProtocolState.PLAY) players.push(player);
        });
        return players;
    }
}
