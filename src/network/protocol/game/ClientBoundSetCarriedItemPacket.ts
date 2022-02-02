import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetCarriedItemPacket implements ClientBoundPacket {
    public constructor(public slot: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeByte(this.slot);
        return packet;
    }
}
