import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class DestroyEntityPacket extends Packet {
    public static readonly id = PlayClientbound.DestroyEntity;

    public EntityID!: number;

    public encrypt() {
        this.writeVarInt(this.EntityID);
    }
}
