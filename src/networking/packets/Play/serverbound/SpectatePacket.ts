import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';

export default class SpectatePacket extends Packet {
    public static readonly id = PlayServerbound.Spectate;

    public TargetPlayer!: string;

    public decrypt() {
        this.TargetPlayer = this.readUUID();
    }
}
