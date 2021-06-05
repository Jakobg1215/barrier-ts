import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class SetDifficultyPacket extends Packet {
    public static readonly id = PlayServerbound.SetDifficulty;

    public Newdifficulty!: number;

    public decrypt() {
        this.Newdifficulty = this.readByte();
    }
}
