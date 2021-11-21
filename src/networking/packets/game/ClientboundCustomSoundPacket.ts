import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundCustomSoundPacket implements ClientboundPacket {
    public constructor(
        public name: string,
        public source: number,
        public x: number,
        public y: number,
        public z: number,
        public volume: number,
        public pitch: number,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeIdentifier(this.name)
            .writeVarInt(this.source)
            .writeInt(this.x)
            .writeInt(this.y)
            .writeInt(this.z)
            .writeFloat(this.volume)
            .writeFloat(this.pitch);
    }
}
