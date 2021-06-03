import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';
import type Position from '../../../../types/Position';

export default class QueryBlockNBTPacket extends Packet {
    public static readonly id = PlayServerbound.QueryBlockNBT;

    public TransactionID!: number;
    public Location!: Position;

    public decrypt() {
        this.TransactionID = this.readVarInt();
        this.Location = this.readPosition();
    }
}
