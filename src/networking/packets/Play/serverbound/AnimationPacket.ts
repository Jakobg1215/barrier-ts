import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class AnimationPacket extends Packet {
    public static readonly id = PlayServerbound.Animation;

    public Hand!: number;

    public decrypt() {
        this.Hand = this.readVarInt();
    }
}