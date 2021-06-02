import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';

export default class SetDifficultyPacket extends Packet {
    public static readonly id = PlayServerbound.SetDifficulty;

    public Newdifficulty!: number;

    public decrypt() {
        this.Newdifficulty = this.readByte();
    }
}
