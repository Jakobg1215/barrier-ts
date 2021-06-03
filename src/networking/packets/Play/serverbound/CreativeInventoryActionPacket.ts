import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';
import type Slot from '../../../../types/Slot';

export default class CreativeInventoryActionPacket extends Packet {
    public static readonly id = PlayServerbound.CreativeInventoryAction;

    public Slot!: number;
    public ClickedItem!: Slot;

    public decrypt() {
        this.Slot = this.readShort();
        this.ClickedItem = this.readSlot();
        this.ClickedItem.NBT?.readNBT();
    }
}
