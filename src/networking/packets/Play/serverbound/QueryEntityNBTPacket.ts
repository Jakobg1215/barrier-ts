import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class QueryEntityNBTPacket extends Packet {
    public static readonly id = PlayServerbound.QueryEntityNBT;

    public TransactionID!: number;
    public EntityID!: number;

    public decrypt() {
        this.TransactionID = this.readVarInt();
        this.EntityID = this.readVarInt();
    }
}
