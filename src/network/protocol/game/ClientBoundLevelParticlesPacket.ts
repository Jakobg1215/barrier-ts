import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundLevelParticlesPacket implements ClientBoundPacket {
    public constructor(
        public particletype: number,
        public overrideLimiter: boolean,
        public x: number,
        public y: number,
        public z: number,
        public xDist: number,
        public yDist: number,
        public zDist: number,
        public maxSpeed: number,
        public count: number,
        public particle: number, // TODO: Add ParticleOptions Type
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.particletype);
        packet.writeBoolean(this.overrideLimiter);
        packet.writeDouble(this.x);
        packet.writeDouble(this.y);
        packet.writeDouble(this.z);
        packet.writeFloat(this.xDist);
        packet.writeFloat(this.yDist);
        packet.writeFloat(this.zDist);
        packet.writeFloat(this.maxSpeed);
        packet.writeInt(this.count);
        packet.writeVarInt(this.particle);
        return packet;
    }
}
