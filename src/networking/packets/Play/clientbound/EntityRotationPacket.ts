import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class EntityRotationPacket extends Packet {
    public static readonly id = PlayClientbound.EntityRotation;

    public EntityID!: number;
    public Yaw!: number;
    public Pitch!: number;
    public OnGround!: boolean;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writeUnsignedByte(this.Yaw);
        this.writeUnsignedByte(this.Pitch);
        this.writeBoolean(this.OnGround);
    }
}
