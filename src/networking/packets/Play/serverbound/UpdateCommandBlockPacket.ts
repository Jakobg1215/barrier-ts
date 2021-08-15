import type Vector3 from '../../../../types/Vector3';
import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class UpdateCommandBlockPacket extends Packet {
    public static readonly id = PlayServerbound.UpdateCommandBlock;

    public Location!: Vector3;
    public Command!: string;
    public Mode!: number;
    public Flags!: number;

    public decrypt() {
        this.Location = this.readPosition();
        this.Command = this.readString();
        this.Mode = this.readByte();
    }
}
