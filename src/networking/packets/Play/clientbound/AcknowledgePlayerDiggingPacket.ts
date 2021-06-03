import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';
import type Position from '../../../../types/Position';

export default class AcknowledgePlayerDiggingPacket extends Packet {
    public static readonly id = PlayClientbound.AcknowledgePlayerDigging;

    public Location!: Position;
    public Block!: number;
    public Status!: number;
    public Successful!: boolean;

    public encrypt() {
        this.writePosition(this.Location);
        this.writeVarInt(this.Block);
        this.writeVarInt(this.Status);
        this.writeBoolean(this.Successful);
    }
}
