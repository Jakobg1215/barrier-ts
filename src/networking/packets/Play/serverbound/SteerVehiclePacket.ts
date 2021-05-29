import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class SteerVehiclePacket extends Packet {
    public static readonly id = PlayServerbound.SteerVehicle;

    public Sideways!: number;
    public Forward!: number;
    public Flags!: number;

    public decrypt() {
        this.Sideways = this.readFloat();
        this.Forward = this.readFloat();
        this.Flags = this.readUnsignedByte();
    }
}