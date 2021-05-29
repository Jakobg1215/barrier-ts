import { LoginServerbound } from "../../../types/PacketIds";
import Packet from "../../Packet";

export default class EncryptionResponsePacket extends Packet {
    public static readonly id = LoginServerbound.EncryptionResponse;

    public SharedSecretLength!: number;
    public SharedSecret!: number[];
    public VerifyTokenLength!: number;
    public VerifyToken!: number[];

    public decrypt() {
        this.SharedSecretLength = this.readVarInt();
        this.SharedSecret = this.readByteArray(this.SharedSecretLength);
        this.VerifyTokenLength = this.readVarInt();
        this.VerifyToken = this.readByteArray(this.VerifyTokenLength);
    }
}