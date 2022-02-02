import type NameSpace from '../../../types/classes/NameSpace';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundStopSoundPacket implements ClientBoundPacket {
    public constructor(public name: NameSpace | null, public source: number | null) {}

    public write(packet: DataBuffer): DataBuffer {
        if (this.source === null) {
            if (this.name === null) {
                packet.writeByte(0);
                return packet;
            }
            packet.writeByte(2);
            packet.writeNameSpace(this.name);
            return packet;
        }
        if (this.name === null) {
            packet.writeByte(1);
            packet.writeVarInt(this.source);
            return packet;
        }
        packet.writeByte(3);
        packet.writeVarInt(this.source);
        packet.writeNameSpace(this.name);
        return packet;
    }
}
