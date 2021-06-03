import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';

export default class EntityAnimationPacket extends Packet {
    public static readonly id = PlayClientbound.EntityAnimation;

    public EntityID!: number;
    public Animation!: number;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writeUnsignedByte(this.Animation);
    }
}
