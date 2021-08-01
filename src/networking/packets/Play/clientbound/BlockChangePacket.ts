import type Position from '../../../../types/Position';
import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class BlockChangePacket extends Packet {
    public static readonly id = PlayClientbound.BlockChange;

    public Location!: Position;
    public BlockID!: number;

    public encrypt() {
        this.writePosition(this.Location);
        this.writeVarInt(this.BlockID);
    }
}
