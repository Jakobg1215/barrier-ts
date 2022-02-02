import type NameSpace from '../../../types/classes/NameSpace';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundCustomSoundPacket implements ClientBoundPacket {
    public constructor(
        public name: NameSpace,
        public source: number,
        public x: number,
        public y: number,
        public z: number,
        public volume: number,
        public pitch: number,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeNameSpace(this.name);
        packet.writeVarInt(this.source);
        packet.writeInt(this.x);
        packet.writeInt(this.y);
        packet.writeInt(this.z);
        packet.writeFloat(this.volume);
        packet.writeFloat(this.pitch);
        return packet;
    }
}
