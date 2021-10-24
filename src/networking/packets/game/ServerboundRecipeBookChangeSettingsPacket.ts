import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundRecipeBookChangeSettingsPacket implements ServerboundPacket {
    public bookType!: RecipeBookType;
    public isOpen!: boolean;
    public isFiltering!: boolean;

    public read(data: Packet): this {
        this.bookType = data.readVarInt();
        this.isOpen = data.readBoolean();
        this.isFiltering = data.readBoolean();
        return this;
    }
}

enum RecipeBookType {
    CRAFTING,
    FURNACE,
    BLAST_FURNACE,
    SMOKER,
}
