import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSoundEntityPacket implements ClientboundPacket {
    public constructor(
        public sound: number,
        public source: number, // This can be an enum
        public id: number,
        public volume: number,
        public pitch: number,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.sound)
            .writeVarInt(this.source)
            .writeVarInt(this.id)
            .writeFloat(this.volume)
            .writeFloat(this.pitch);
    }
}
