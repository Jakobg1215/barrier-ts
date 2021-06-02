import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';

export default class UpdateJigsawBlockPacket extends Packet {
    public static readonly id = PlayServerbound.UpdateJigsawBlock;

    public Location!: object;
    public Name!: string;
    public Target!: string;
    public Pool!: string;
    public Finalstate!: string;
    public Jointtype!: string;

    public decrypt() {
        this.Location = this.readPosition();
        this.Name = this.readIdentifier();
        this.Target = this.readIdentifier();
        this.Pool = this.readIdentifier();
        this.Finalstate = this.readString();
        this.Jointtype = this.readString();
    }
}
