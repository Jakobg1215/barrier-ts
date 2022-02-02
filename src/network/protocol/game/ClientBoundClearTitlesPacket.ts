import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundClearTitlesPacket implements ClientBoundPacket {
    public constructor(public resetTimes: boolean) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeBoolean(this.resetTimes);
        return packet;
    }
}
