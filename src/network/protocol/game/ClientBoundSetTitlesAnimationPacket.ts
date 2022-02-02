import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetTitlesAnimationPacket implements ClientBoundPacket {
    public constructor(public fadeIn: number, public stay: number, public fadeOut: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeInt(this.fadeIn);
        packet.writeInt(this.stay);
        packet.writeInt(this.fadeOut);
        return packet;
    }
}
