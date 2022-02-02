import type NameSpace from '../../../types/classes/NameSpace';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundPlaceGhostRecipePacket implements ClientBoundPacket {
    public constructor(public containerId: number, public recipe: NameSpace) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeByte(this.containerId);
        packet.writeNameSpace(this.recipe);
        return packet;
    }
}
