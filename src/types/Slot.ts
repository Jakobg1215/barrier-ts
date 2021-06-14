import type NBT from './NBT';

export default class Slot {
    public Present = false;
    public ItemID!: number | undefined;
    public ItemCount!: number | undefined;
    public NBT!: NBT | undefined;
    public constructor(slot?: { present: boolean; itemID?: number; itemCount?: number; NBT?: NBT }) {
        this.Present = slot?.present ?? false;
        this.ItemID = slot?.itemID;
        this.ItemCount = slot?.itemCount;
        this.NBT = slot?.NBT;
    }
}
