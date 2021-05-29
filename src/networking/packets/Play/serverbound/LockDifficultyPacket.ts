import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class LockDifficultyPacket extends Packet {
    public static readonly id = PlayServerbound.LockDifficulty;

    public Locked!: boolean;

    public decrypt() {
        this.Locked = this.readBoolean();
    }
}