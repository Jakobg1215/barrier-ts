import { LoginServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class LoginPluginResponsePacket extends Packet {
    public static readonly id = LoginServerbound.LoginPluginResponse;

    public MessageID!: number;
    public Successful!: boolean;
    public Data!: number[];

    public decrypt() {
        this.MessageID = this.readVarInt();
        this.Successful = this.readBoolean();
        if (this.Successful) {
            for (let index = 0; index < this.getBytes().slice(this.getOffset()).length; index++) {
                this.Data.push(this.readByte());
            }
        }
    }
}
