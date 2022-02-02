import type Item from '../../../types/classes/Item';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundSetCreativeModeSlotPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly slotNum: number;
    public readonly itemStack: Item;

    public constructor(data: DataBuffer) {
        this.slotNum = data.readShort();
        this.itemStack = data.readItem();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleSetCreativeModeSlot(this);
    }
}
