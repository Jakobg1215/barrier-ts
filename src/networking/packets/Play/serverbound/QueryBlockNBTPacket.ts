import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';
import type Vector3 from '../../../../types/Vector3';

export default class QueryBlockNBTPacket extends Packet {
    public static readonly id = PlayServerbound.QueryBlockNBT;

    public TransactionID!: number;
    public Location!: Vector3;

    public decrypt() {
        this.TransactionID = this.readVarInt();
        this.Location = this.readPosition();
    }
}
