import type { RecipeBookType } from '../../../types/enums/RecipeBookType';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundRecipeBookChangeSettingsPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly bookType: RecipeBookType;
    public readonly isOpen: boolean;
    public readonly isFiltering: boolean;

    public constructor(data: DataBuffer) {
        this.bookType = data.readVarInt();
        this.isOpen = data.readBoolean();
        this.isFiltering = data.readBoolean();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleRecipeBookChangeSettingsPacket(this);
    }
}
