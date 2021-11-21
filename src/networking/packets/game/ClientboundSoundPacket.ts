import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSoundPacket implements ClientboundPacket {
    public constructor(
        public sound: number,
        public source: number,
        public x: number,
        public y: number,
        public z: number,
        public volume: number,
        public pitch: number,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.sound)
            .writeVarInt(this.source)
            .writeInt(this.x)
            .writeInt(this.y)
            .writeInt(this.z)
            .writeFloat(this.volume)
            .writeFloat(this.pitch);
    }
}
