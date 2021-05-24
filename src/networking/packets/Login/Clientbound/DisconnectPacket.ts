import { LoginClientbound } from "../../../types/PacketIds";
import Packet from "../../Packet";

export default class DisconnectPacket extends Packet {
    public static readonly id = LoginClientbound.Disconnect;

    public Reason!: string;

    public encrypt() {
        this.writeString(this.Reason);
    }
}