import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class WindowConfirmationPacket extends Packet {
    public static readonly id = PlayServerbound.WindowConfirmation;

    public WindowID!: number;
    public ActionNumber!: number;
    public Accepted!: boolean;

    public decrypt() {
        this.WindowID = this.readByte();
        this.ActionNumber = this.readShort();
        this.Accepted = this.readBoolean();
    }
}
