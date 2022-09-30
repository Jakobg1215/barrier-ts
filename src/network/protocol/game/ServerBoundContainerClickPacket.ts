import type Item from '../../../types/classes/Item';
import type { ClickType } from '../../../types/enums/ClickType';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundContainerClickPacket implements ServerBoundPacket<GamePacketListener> {
    private static readonly MAX_SLOT_COUNT = 128;
    public readonly containerId: number;
    public readonly stateId: number;
    public readonly slotNum: number;
    public readonly buttonNum: number;
    public readonly clickType: ClickType;
    public readonly carriedItem: Item;
    public readonly changedSlots = new Map<number, Item>();

    public constructor(data: DataBuffer) {
        this.containerId = data.readByte();
        this.stateId = data.readVarInt();
        this.slotNum = data.readShort();
        this.buttonNum = data.readByte();
        this.clickType = data.readVarInt();
        const changedSlotsSize = data.readVarInt();
        if (changedSlotsSize > ServerBoundContainerClickPacket.MAX_SLOT_COUNT) throw new Error('Mapping is longer than expected!');
        for (let index = 0; index < changedSlotsSize; index++) this.changedSlots.set(data.readShort(), data.readItem());
        this.carriedItem = data.readItem();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleContainerClick(this);
    }
}
