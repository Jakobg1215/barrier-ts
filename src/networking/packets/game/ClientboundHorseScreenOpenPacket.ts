import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundHorseScreenOpenPacket implements ClientboundPacket {
    public constructor(public containerId: number, public size: number, public entityId: number) {}

    public write(): Packet {
        return new Packet().writeUnsignedByte(this.containerId).writeVarInt(this.size).writeInt(this.entityId);
    }
}
