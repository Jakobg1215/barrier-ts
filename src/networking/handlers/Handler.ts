import type BarrierTs from '../../BarrierTs';
import type Connection from '../Connection';

export default interface Handler<ServerPacket> {
    hander(packet: ServerPacket, connection: Connection, server: BarrierTs): void;
}
