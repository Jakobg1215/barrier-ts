import type Position from '../../../../types/Position';
import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class QueryBlockNBTPacket extends Packet {
    public static readonly id = PlayServerbound.QueryBlockNBT;

    public TransactionID!: number;
    public Location!: Position;

    public decrypt() {
        this.TransactionID = this.readVarInt();
        this.Location = this.readPosition();
    }
}
