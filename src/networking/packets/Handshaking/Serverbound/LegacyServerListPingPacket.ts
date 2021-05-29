import { HandshakingServerbound } from "../../../types/PacketIds";
import Packet from "../../Packet";

export default class LegacyServerListPingPacket extends Packet {
    public static readonly id = HandshakingServerbound.LegacyServerListPing;

    public Payload!: number;
    public Identifier!: number;
    public PingHostLength!: number;
    public PingHost!: string;
    public RestData!: number;
    public ProtocolVersion!: number;
    public HostnameLength!: number;
    public Hostname!: string;
    public Port!: number;

    public decrypt() {
        this.addOffset(-1, true);
        this.Payload = this.readUnsignedByte();
        this.Identifier = this.readUnsignedByte();
        this.PingHostLength = this.readShort();
        this.PingHost = this.getBytes().slice(this.getOffset(), this.addOffset(this.PingHostLength * 2, true)).filter(v => v !== 0).toString();
        this.RestData = this.readShort();
        this.ProtocolVersion = this.readUnsignedByte();
        this.HostnameLength = this.readShort();
        this.Hostname = this.getBytes().slice(this.getOffset(), this.addOffset(this.HostnameLength * 2, true)).filter(v => v !== 0).toString();
        this.Port = this.readInt();
    }
}