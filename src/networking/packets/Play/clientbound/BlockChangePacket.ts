import type Vector3 from '../../../../types/Vector3';
import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class BlockChangePacket extends Packet {
    public static readonly id = PlayClientbound.BlockChange;

    public Location!: Vector3;
    public BlockID!: number;

    public encrypt() {
        this.writePosition(this.Location);
        this.writeVarInt(this.BlockID);
    }
}
