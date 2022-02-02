import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetDisplayObjectivePacket implements ClientBoundPacket {
    public constructor(public slot: number, public objectiveName: string) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeByte(this.slot);
        packet.writeString(this.objectiveName);
        return packet;
    }
}
