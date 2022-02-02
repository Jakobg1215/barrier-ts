import type NameSpace from '../../../types/classes/NameSpace';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSelectAdvancementsTabPacket implements ClientBoundPacket {
    public constructor(public tab: NameSpace | null) {}

    public write(packet: DataBuffer): DataBuffer {
        if (this.tab === null) {
            packet.writeBoolean(false);
            return packet;
        }
        packet.writeBoolean(true);
        packet.writeNameSpace(this.tab);
        return packet;
    }
}
