import NBT from './NBT';

export default class Slot {
    public Present!: boolean;
    public ItemID!: number | undefined;
    public ItemCount!: number | undefined;
    public NBT!: NBT | undefined;
}
