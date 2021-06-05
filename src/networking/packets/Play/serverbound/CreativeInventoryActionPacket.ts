import type Slot from '../../../../types/Slot';
import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class CreativeInventoryActionPacket extends Packet {
    public static readonly id = PlayServerbound.CreativeInventoryAction;

    public Slot!: number;
    public ClickedItem!: Slot;

    public decrypt() {
        this.Slot = this.readShort();
        this.ClickedItem = this.readSlot();
    }
}
