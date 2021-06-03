import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';

export default class SpawnExperienceOrbPacket extends Packet {
    public static readonly id = PlayClientbound.SpawnExperienceOrb;

    public EntityID!: number;
    public X!: number;
    public Y!: number;
    public Z!: number;
    public Count!: number;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writeDouble(this.X);
        this.writeDouble(this.Y);
        this.writeDouble(this.Z);
        this.writeShort(this.Count);
    }
}
