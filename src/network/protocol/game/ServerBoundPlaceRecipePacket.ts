import type NameSpace from '../../../types/classes/NameSpace';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundPlaceRecipePacket implements ServerBoundPacket<GamePacketListener> {
    public readonly containerId: number;
    public readonly recipe: NameSpace;
    public readonly shiftDown: boolean;

    public constructor(data: DataBuffer) {
        this.containerId = data.readByte();
        this.recipe = data.readNameSpace();
        this.shiftDown = data.readBoolean();
    }

    public handle(handler: GamePacketListener): void {
        handler.handlePlaceRecipe(this);
    }
}
