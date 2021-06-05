import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class SpectatePacket extends Packet {
    public static readonly id = PlayServerbound.Spectate;

    public TargetPlayer!: string;

    public decrypt() {
        this.TargetPlayer = this.readUUID();
    }
}
