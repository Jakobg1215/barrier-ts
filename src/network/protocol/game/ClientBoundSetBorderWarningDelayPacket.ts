import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetBorderWarningDelayPacket implements ClientBoundPacket {
    public constructor(public warningDelay: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.warningDelay);
        return packet;
    }
}
