import Packet from "../../Packet";
import { LoginServerbound } from "../../../types/PacketIds";

export default class LoginStartPacket extends Packet {
    public static readonly id = LoginServerbound.LoginStart;

    public Name!: string;

    public decrypt() {
        this.Name = this.readString();
    }
}