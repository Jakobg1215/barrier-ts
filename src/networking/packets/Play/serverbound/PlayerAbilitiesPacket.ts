import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';

export default class PlayerAbilitiesPacket extends Packet {
    public static readonly id = PlayServerbound.PlayerAbilities;

    public Flags!: number;

    public decrypt() {
        this.Flags = this.readByte();
    }
}
