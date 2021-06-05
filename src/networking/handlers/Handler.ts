import type Server from '../../server';
import type Packet from '../packets/Packet';
import type PlayerConnection from '../players/PlayerConnection';

export default interface Handler<packet extends Packet> {
    id: number;
    handle(packet: packet, server: Server, player: PlayerConnection): void | Promise<void>;
}
