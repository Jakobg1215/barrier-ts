import { LoginClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class EncryptionRequestPacket extends Packet {
    public static readonly id = LoginClientbound.EncryptionRequest;

    public ServerID!: string;
    public PublicKeyLength!: number;
    public PublicKey!: number[];
    public VerifyTokenLength!: number;
    public VerifyToken!: number[];

    public encrypt() {
        this.writeString(this.ServerID);
        this.writeVarInt(this.PublicKeyLength);
        this.writeByteArray(this.PublicKeyLength, this.PublicKey);
        this.writeVarInt(this.VerifyTokenLength);
        this.writeByteArray(this.VerifyTokenLength, this.VerifyToken);
    }
}
