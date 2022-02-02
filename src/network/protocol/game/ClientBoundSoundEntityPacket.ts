import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSoundEntityPacket implements ClientBoundPacket {
    public constructor(
        public sound: number,
        public source: number, // This can be an enum
        public id: number,
        public volume: number,
        public pitch: number,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.sound);
        packet.writeVarInt(this.source);
        packet.writeVarInt(this.id);
        packet.writeFloat(this.volume);
        packet.writeFloat(this.pitch);
        return packet;
    }
}
