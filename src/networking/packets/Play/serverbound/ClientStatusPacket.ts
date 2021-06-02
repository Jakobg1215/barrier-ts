import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';

export default class ClientStatusPacket extends Packet {
    public static readonly id = PlayServerbound.ClientStatus;

    public ActionID!: number;

    public decrypt() {
        this.ActionID = this.readVarInt();
    }
}
