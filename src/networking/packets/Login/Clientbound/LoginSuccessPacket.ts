import Packet from "../../Packet";
import { LoginClientbound } from "../../../types/PacketIds";

export default class LoginSuccessPacket extends Packet {
    public static readonly id = LoginClientbound.LoginSuccess;

    public UUID!: string;
    public Username!: string

    public encrypt() {
        this.writeUUID(this.UUID);
        this.writeString(this.Username);
    }
}