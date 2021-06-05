import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class HeldItemChangePacket extends Packet {
    public static readonly id = PlayServerbound.HeldItemChange;

    public Slot!: number;

    public decrypt() {
        this.Slot = this.readShort();
    }
}
