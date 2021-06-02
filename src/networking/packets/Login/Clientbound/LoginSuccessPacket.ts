import { LoginClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class LoginSuccessPacket extends Packet {
    public static readonly id = LoginClientbound.LoginSuccess;

    public UUID!: string;
    public Username!: string;

    public encrypt() {
        this.writeUUID(this.UUID);
        this.writeString(this.Username);
    }
}
