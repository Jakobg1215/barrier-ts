import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class PlayerBlockPlacementPacket extends Packet {
    public static readonly id = PlayServerbound.PlayerBlockPlacement;

    public Hand!: number;
    public Location!: object;
    public Face!: number;
    public CursorPositionX!: number;
    public CursorPositionY!: number;
    public CursorPositionZ!: number;
    public Insideblock!: boolean;

    public decrypt() {
        this.Hand = this.readVarInt();
        this.Location = this.readPosition();
        this.Face = this.readVarInt();
        this.CursorPositionX = this.readFloat();
        this.CursorPositionY = this.readFloat();
        this.CursorPositionZ = this.readFloat();
        this.Insideblock = this.readBoolean();
    }
}