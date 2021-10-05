import type { Buffer } from 'node:buffer';
import { LoginClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class EncryptionRequestPacket extends Packet {
    public static readonly id = LoginClientbound.EncryptionRequest;

    public ServerID!: string;
    public PublicKeyLength!: number;
    public PublicKey!: Buffer;
    public VerifyTokenLength!: number;
    public VerifyToken!: Buffer;

    public encrypt() {
        this.writeString(this.ServerID);
        this.writeVarInt(this.PublicKeyLength);
        this.writeByteArray(this.PublicKey);
        this.writeVarInt(this.VerifyTokenLength);
        this.writeByteArray(this.VerifyToken);
    }
}
