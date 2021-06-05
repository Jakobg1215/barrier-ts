import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class ResourcePackStatusPacket extends Packet {
    public static readonly id = PlayServerbound.ResourcePackStatus;

    public Result!: number;

    public decrypt() {
        this.Result = this.readVarInt();
    }
}
