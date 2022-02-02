import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundLevelParticlesPacket implements ClientBoundPacket {
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

    public write(packet: DataBuffer): DataBuffer {
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
