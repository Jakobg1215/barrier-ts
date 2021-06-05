import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class EntityAnimationPacket extends Packet {
    public static readonly id = PlayClientbound.EntityAnimation;

    public EntityID!: number;
    public Animation!: number;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writeUnsignedByte(this.Animation);
    }
}
