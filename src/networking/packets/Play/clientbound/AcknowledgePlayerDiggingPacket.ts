import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';
import Vector3 from '../../../../types/Vector3';

export default class AcknowledgePlayerDiggingPacket extends Packet {
    public static readonly id = PlayClientbound.AcknowledgePlayerDigging;

    public Location!: Vector3;
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
