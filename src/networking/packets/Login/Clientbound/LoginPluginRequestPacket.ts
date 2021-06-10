import { LoginClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class LoginPluginRequestPacket extends Packet {
    public static readonly id = LoginClientbound.LoginPluginRequest;

    public MessageID!: number;
    public Channel!: string;
    public Data!: Buffer;

    public encrypt() {
        this.writeVarInt(this.MessageID);
        this.writeIdentifier(this.Channel);
        this.writeByteArray(this.Data);
    }
}
