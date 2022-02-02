import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundRotateHeadPacket implements ClientBoundPacket {
    public constructor(public entityId: number, public yHeadRot: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.entityId);
        packet.writeByte(this.yHeadRot);
        return packet;
    }
}
