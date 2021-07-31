import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class DestroyEntityPacket extends Packet {
    public static readonly id = PlayClientbound.DestroyEntity;

    public Count!: number;
    public EntityIDs!: number[];

    public encrypt() {
        this.writeVarInt(this.Count);
        this.EntityIDs.forEach(id => this.writeVarInt(id));
    }
}
