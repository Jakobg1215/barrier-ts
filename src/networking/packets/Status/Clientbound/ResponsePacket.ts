import Packet from "../../Packet";
import { StatusClientbound } from "../../../types/PacketIds";

export default class ResponsePacket extends Packet {
    public static readonly id = StatusClientbound.Response;

    public JSONResponse!: string;

    public encrypt() {
        this.writeString(this.JSONResponse);
    }
}