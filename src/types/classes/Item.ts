export default class Item {
    public static get Empty(): Item {
        return new this(false, 0, 0, Buffer.alloc(1));
    }

    private itemPresent: boolean;
    private itemID: number;
    private itemCount: number;
    private itemNbt: Buffer;

    public constructor(present: boolean, id: number, count: number, nbt: Buffer) {
        this.itemPresent = present;
        this.itemID = id;
        this.itemCount = count;
        this.itemNbt = nbt;
    }

    public get present(): boolean {
        return this.itemPresent;
    }

    public get id(): number {
        return this.itemID;
    }

    public get count(): number {
        return this.itemCount;
    }

    public get nbt(): Buffer {
        return this.itemNbt;
    }
}
