import type NameSpace from '../../../types/classes/NameSpace';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSelectAdvancementsTabPacket implements ClientBoundPacket {
    public constructor(public tab: NameSpace | null) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeBoolean(this.tab !== null);
        if (this.tab) packet.writeNameSpace(this.tab);
        return packet;
    }
}
