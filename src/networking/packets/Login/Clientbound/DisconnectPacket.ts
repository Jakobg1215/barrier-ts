import Chat from '../../../../types/Chat';
import { LoginClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class DisconnectPacket extends Packet {
    public static readonly id = LoginClientbound.Disconnect;

    public Reason!: Chat;

    public encrypt() {
        this.writeChat(this.Reason);
    }
}
