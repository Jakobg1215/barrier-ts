import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class EntityPositionPacket extends Packet {
    public static readonly id = PlayClientbound.EntityPosition;

    public EntityID!: number;
    public DeltaX!: number;
    public DeltaY!: number;
    public DeltaZ!: number;
    public OnGround!: boolean;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writeShort(this.DeltaX);
        this.writeShort(this.DeltaY);
        this.writeShort(this.DeltaZ);
        this.writeBoolean(this.OnGround);
    }
}
