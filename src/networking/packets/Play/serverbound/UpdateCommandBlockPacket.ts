import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class UpdateCommandBlockPacket extends Packet {
    public static readonly id = PlayServerbound.UpdateCommandBlock;

    public Location!: object;
    public Command!: string;
    public Mode!: number;
    public Flags!: number;

    public decrypt() {
        this.Location = this.readPosition();
        this.Command = this.readString();
        this.Mode = this.readByte();
    }
}