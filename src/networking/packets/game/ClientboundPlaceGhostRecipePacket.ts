import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundPlaceGhostRecipePacket implements ClientboundPacket {
    public constructor(public containerId: number, public recipe: string) {}

    public write(): Packet {
        return new Packet().writeByte(this.containerId).writeIdentifier(this.recipe);
    }
}
