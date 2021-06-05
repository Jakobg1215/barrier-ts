import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class EntityHeadLookPacket extends Packet {
    public static readonly id = PlayClientbound.EntityHeadLook;

    public EntityID!: number;
    public HeadYaw!: number;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writeAngle(this.HeadYaw);
    }
}
