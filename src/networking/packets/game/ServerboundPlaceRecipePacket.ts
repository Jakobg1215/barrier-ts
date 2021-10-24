import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundPlaceRecipePacket implements ServerboundPacket {
    public containerId!: number;
    public recipe!: string;
    public shiftDown!: boolean;

    public read(data: Packet): this {
        this.containerId = data.readByte();
        this.recipe = data.readString();
        this.shiftDown = data.readBoolean();
        return this;
    }
}
