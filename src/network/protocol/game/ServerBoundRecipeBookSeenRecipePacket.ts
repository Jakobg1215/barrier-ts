import type NameSpace from '../../../types/classes/NameSpace';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundRecipeBookSeenRecipePacket implements ServerBoundPacket<GamePacketListener> {
    public readonly recipe: NameSpace;

    public constructor(data: DataBuffer) {
        this.recipe = data.readNameSpace();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleRecipeBookSeenRecipe(this);
    }
}
