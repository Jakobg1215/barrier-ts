import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundRecipeBookSeenRecipePacket implements ServerboundPacket {
    public recipe!: string;

    public read(data: Packet): this {
        this.recipe = data.readString();
        return this;
    }
}
