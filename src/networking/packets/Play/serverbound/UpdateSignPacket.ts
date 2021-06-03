import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';
import type Position from '../../../../types/Position';

export default class UpdateSignPacket extends Packet {
    public static readonly id = PlayServerbound.UpdateSign;

    public Location!: Position;
    public Line1!: string;
    public Line2!: string;
    public Line3!: string;
    public Line4!: string;

    public decrypt() {
        this.Location = this.readPosition();
        this.Line1 = this.readString();
        this.Line2 = this.readString();
        this.Line3 = this.readString();
        this.Line4 = this.readString();
    }
}
