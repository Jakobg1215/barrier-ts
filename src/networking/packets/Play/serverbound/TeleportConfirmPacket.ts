import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class TeleportConfirmPacket extends Packet {
    public static readonly id = PlayServerbound.TeleportConfirm;

    public TeleportID!: number;

    public decrypt() {
        this.TeleportID = this.readVarInt();
    }
}
