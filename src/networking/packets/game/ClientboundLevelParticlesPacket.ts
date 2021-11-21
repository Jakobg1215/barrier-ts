import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundLevelParticlesPacket implements ClientboundPacket {
    public constructor(
        public x: number,
        public y: number,
        public z: number,
        public xDist: number,
        public yDist: number,
        public zDist: number,
        public maxSpeed: number,
        public count: number,
        public overrideLimiter: boolean,
        public particle: number, // TODO: Add ParticleOptions Type
    ) {}

    public write(): Packet {
        return new Packet()
            .writeDouble(this.x)
            .writeDouble(this.y)
            .writeDouble(this.z)
            .writeFloat(this.xDist)
            .writeFloat(this.yDist)
            .writeFloat(this.zDist)
            .writeFloat(this.maxSpeed)
            .writeInt(this.count)
            .writeVarInt(this.particle);
    }
}
