import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class PlayerMovementPacket extends Packet {
    public static readonly id = PlayServerbound.PlayerMovement;

    public OnGround!: boolean

    public decrypt() {
        this.OnGround = this.readBoolean();
    }
}