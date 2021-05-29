import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";
import type Slot from "../../../../types/Slot";

export default class EditBookPacket extends Packet {
    public static readonly id = PlayServerbound.EditBook;

    public Newbook!: Slot;
    public Issigning!: boolean;
    public Hand!: number

    public decrypt() {
        this.Newbook = this.readSlot();
        this.Issigning = this.readBoolean();
        this.Hand = this.readVarInt();
    }
}