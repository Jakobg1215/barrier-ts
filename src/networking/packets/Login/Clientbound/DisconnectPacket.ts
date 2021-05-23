import Packet from "../../Packet";
import { LoginClientbound } from "../../../types/PacketIds";

export default class DisconnectPacket extends Packet {
    public static readonly id = LoginClientbound.Disconnect;

    public Reason!: string;

    public encrypt() {
        this.writeString(this.Reason);
    }
}