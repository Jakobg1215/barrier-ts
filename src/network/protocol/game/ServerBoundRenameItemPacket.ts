import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundRenameItemPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly name: string;

    public constructor(data: DataBuffer) {
        this.name = data.readString();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleRenameItem(this);
    }
}
