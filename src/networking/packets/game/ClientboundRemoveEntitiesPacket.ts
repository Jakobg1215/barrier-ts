import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundRemoveEntitiesPacket implements ClientboundPacket {
    public constructor(public entityIds: number[]) {}

    public write(): Packet {
        const data: Packet = new Packet().writeVarInt(this.entityIds.length);
        this.entityIds.forEach(id => data.writeVarInt(id));
        return data;
    }
}
