import Item from '../../types/classes/Item';

export default class PlayerInventory {
    private inventory = new Map<number, Item>();
    private selectedSlot = 0;
    private changedItems = new Map<number, Item>();

    public setSlot(slot: number, item: Item) {
        this.inventory.set(slot, item);
        this.changedItems.set(slot, item);
    }

    public getSlot(slot: number): Item | null {
        const item = this.inventory.get(slot);
        return item ? item : null;
    }

    public getItemSlots(): Item[] {
        const data = Array(45).fill(Item.Empty) as Item[];
        this.inventory.forEach((item, index) => {
            data[index] = item;
        });
        return data;
    }

    public getChangedItems(): { index: number; item: Item }[] {
        const items: { index: number; item: Item }[] = [];

        for (const [slot, item] of this.changedItems.entries()) {
            items.push({ index: slot, item });
        }

        this.changedItems.clear();
        return items;
    }

    public toNBT() {
        const items: any[] = [];

        this.inventory.forEach((item, index) => {
            if (!item.present) return;
            items.push({
                slot: index + 'b',
                present: '1b',
                id: item.id + 's',
                count: item.count + 'b',
                nbt: [':BA:', ...item.nbt],
            });
        });

        return items;
    }

    public get selectedHand() {
        return this.selectedSlot;
    }

    public set selectedHand(slot: number) {
        this.selectedSlot = slot;
    }

    public get changed() {
        return this.changedItems.size > 0;
    }
}
