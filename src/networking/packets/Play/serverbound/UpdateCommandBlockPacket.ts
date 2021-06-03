import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';
import type Position from '../../../../types/Position';

export default class UpdateCommandBlockPacket extends Packet {
    public static readonly id = PlayServerbound.UpdateCommandBlock;

    public Location!: Position;
    public Command!: string;
    public Mode!: number;
    public Flags!: number;

    public decrypt() {
        this.Location = this.readPosition();
        this.Command = this.readString();
        this.Mode = this.readByte();
    }
}
