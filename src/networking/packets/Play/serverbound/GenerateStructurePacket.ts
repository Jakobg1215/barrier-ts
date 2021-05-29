import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class GenerateStructurePacket extends Packet {
    public static readonly id = PlayServerbound.GenerateStructure;

    public Location!: object;
    public Levels!: number;
    public KeepJigsaws!: boolean;

    public decrypt() {
        this.Location = this.readPosition();
        this.Levels = this.readVarInt();
        this.KeepJigsaws = this.readBoolean();
    }
}