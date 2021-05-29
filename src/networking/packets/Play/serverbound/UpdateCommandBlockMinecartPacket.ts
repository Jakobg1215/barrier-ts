import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class UpdateCommandBlockMinecartPacket extends Packet {
    public static readonly id = PlayServerbound.UpdateCommandBlockMinecart;

    public EntityID!: number;
    public Command!: string;
    public TrackOutput!: boolean;

    public decrypt() {
        this.EntityID = this.readVarInt();
        this.Command = this.readString();
        this.TrackOutput = this.readBoolean();
    }
}