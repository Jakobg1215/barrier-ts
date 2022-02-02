import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetBorderWarningDistancePacket implements ClientBoundPacket {
    public constructor(public warningBlocks: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.warningBlocks);
        return packet;
    }
}
