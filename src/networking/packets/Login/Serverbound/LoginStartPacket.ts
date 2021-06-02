import { LoginServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class LoginStartPacket extends Packet {
    public static readonly id = LoginServerbound.LoginStart;

    public Name!: string;

    public decrypt() {
        this.Name = this.readString();
    }
}
