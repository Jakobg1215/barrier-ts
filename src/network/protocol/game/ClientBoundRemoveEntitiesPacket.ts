import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundRemoveEntitiesPacket implements ClientBoundPacket {
    public constructor(public entityIds: number[]) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.entityIds.length);
        this.entityIds.forEach((id) => packet.writeVarInt(id));
        return packet;
    }
}
