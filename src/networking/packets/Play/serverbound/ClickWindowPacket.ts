import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';
import type Slot from '../../../../types/Slot';

export default class ClickWindowPacket extends Packet {
    public static readonly id = PlayServerbound.ClickWindow;

    public WindowID!: number;
    public Slot!: number;
    public Button!: number;
    public ActionNumber!: number;
    public Mode!: number;
    public Clickeditem!: Slot;

    public decrypt() {
        this.WindowID = this.readUnsignedByte();
        this.Slot = this.readShort();
        this.Button = this.readByte();
        this.ActionNumber = this.readShort();
        this.Mode = this.readVarInt();
        this.Clickeditem = this.readSlot();
    }
}
