import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundRemoveEntitiesPacket implements ClientboundPacket {
    public readonly id: number = 58;
    public entityIds: number[];

    public constructor(entityIds: number[]) {
        this.entityIds = entityIds;
    }

    public write(): Packet {
        const data = new Packet().writeVarInt(this.entityIds.length);
        this.entityIds.forEach(id => data.writeVarInt(id));
        return data;
    }
}
