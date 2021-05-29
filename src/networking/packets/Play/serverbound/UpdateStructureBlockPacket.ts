import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class UpdateStructureBlockPacket extends Packet {
    public static readonly id = PlayServerbound.UpdateStructureBlock;

    public Location!: object;
    public Action!: number;
    public Mode!: number;
    public Name!: string;
    public OffsetX!: number;
    public OffsetY!: number;
    public OffsetZ!: number;
    public SizeX!: number;
    public SizeY!: number;
    public SizeZ!: number;
    public Mirror!: number;
    public Rotation!: number;
    public Metadata!: string;
    public Integrity!: number;
    public Seed!: bigint;
    public Flags!: number;

    public decrypt() {
        this.Location = this.readPosition();
        this.Action = this.readVarInt();
        this.Mode = this.readVarInt();
        this.Name = this.readString();
        this.OffsetX = this.readByte();
        this.OffsetY = this.readByte();
        this.OffsetZ = this.readByte();
        this.SizeX = this.readByte();
        this.SizeY = this.readByte();
        this.SizeZ = this.readByte();
        this.Mirror = this.readVarInt();
        this.Rotation = this.readVarInt();
        this.Metadata = this.readString();
        this.Integrity = this.readFloat();
        this.Seed = this.readVarLong();
    }
}