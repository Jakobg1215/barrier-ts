import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class PluginMessagePacket extends Packet {
    public static readonly id = PlayClientbound.PluginMessage;

    public Channel!: string;
    public Data!: Buffer;

    public encrypt() {
        this.writeIdentifier(this.Channel);
        this.writeByteArray(this.Data);
    }
}
