import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';

export default class CloseWindowPacket extends Packet {
    public static readonly id = PlayServerbound.CloseWindow;

    public WindowID!: number;

    public decrypt() {
        this.WindowID = this.readUnsignedByte();
    }
}
