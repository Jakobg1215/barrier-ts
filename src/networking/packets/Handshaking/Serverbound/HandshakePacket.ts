import { HandshakingServerbound } from "../../../types/PacketIds";
import Packet from "../../Packet";

export default class HandshakePacket extends Packet {
    public static readonly id = HandshakingServerbound.Handshake;

    public ProtocolVersion!: number;
    public ServerAddress!: string;
    public ServerPort!: number;
    public NextState!: number;

    public decrypt() {
        this.ProtocolVersion = this.readVarInt();
        this.ServerAddress = this.readString();
        this.ServerPort = this.readUnsignedShort();
        this.NextState = this.readVarInt();
    }
}