import type BarrierTs from '../../BarrierTs';
import type Player from '../../world/entity/Player/Player';

export default interface Handler<ServerPacket> {
    hander(packet: ServerPacket, connection: Player, server: BarrierTs): void;
}
