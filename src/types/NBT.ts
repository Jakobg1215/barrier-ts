export default class NBT {
    public readonly name;
    public readonly roots: Map<string, any> = new Map();
    private data: Buffer;
    private offset = 0;
    public constructor(data: Buffer = Buffer.alloc(0), list: boolean = false) {
        this.data = data;
        if (!list) {
            this.readByte();
            this.name = this.readRootName();
        } else {
            this.name = '';
        }
    }

    public readNBT() {
        while (true) {
            switch (this.readByte()) {
                case 0:
                    return this;
                case 1:
                    this.roots.set(this.readRootName(), this.readByte());
                    break;
                case 2:
                    this.roots.set(this.readRootName(), this.readShort());
                    break;
                case 3:
                    this.roots.set(this.readRootName(), this.readInt());
                    break;
                case 4:
                    this.roots.set(this.readRootName(), this.readLong());
                    break;
                case 5:
                    this.roots.set(this.readRootName(), this.data.readFloatBE(this.addOffset(4)));
                    break;
                case 6:
                    this.roots.set(this.readRootName(), this.data.readDoubleBE(this.addOffset(8)));
                    break;
                case 7:
                    const bytesName = this.readRootName();
                    const bytes: number[] = [];
                    for (let index = 0; index < this.readInt(); index++) {
                        bytes.push(this.readByte());
                    }
                    this.roots.set(bytesName, bytes);
                    break;
                case 8:
                    this.roots.set(
                        this.readRootName(),
                        this.data
                            .slice(this.offset + 2, this.addOffset(this.data.readUInt16BE(this.addOffset(2)), true))
                            .toString(),
                    );
                    break;
                case 9:
                    this.roots.set(this.readRootName(), this.readList());
                    break;
                case 10:
                    const compound = new NBT(this.data.slice(this.offset - 1));
                    compound.readNBT();
                    this.addOffset(compound.offset - 1, true);
                    this.roots.set(compound.name, compound);
                    break;
                case 11:
                    const intsName = this.readRootName();
                    const ints: number[] = [];
                    for (let index = 0; index < this.readInt(); index++) {
                        ints.push(this.readInt());
                    }
                    this.roots.set(intsName, ints);
                    break;
                case 12:
                    const longsName = this.readRootName();
                    const longs: bigint[] = [];
                    for (let index = 0; index < this.readInt(); index++) {
                        longs.push(this.readLong());
                    }
                    this.roots.set(longsName, longs);
                    break;
            }
        }
    }

    private readList() {
        const entries: any[] = [];
        const type = this.readByte();
        const length = this.readInt();
        switch (type) {
            case 1:
                for (let index = 0; index < length; index++) {
                    entries.push(this.readByte());
                }
                return entries;
            case 2:
                for (let index = 0; index < length; index++) {
                    entries.push(this.readShort());
                }
                return entries;
            case 3:
                for (let index = 0; index < length; index++) {
                    entries.push(this.readInt);
                }
                return entries;
            case 4:
                for (let index = 0; index < length; index++) {
                    entries.push(this.readLong());
                }
                return entries;
            case 5:
                for (let index = 0; index < length; index++) {
                    entries.push(this.roots.set(this.readRootName(), this.data.readFloatBE(this.addOffset(4))));
                }
                return entries;
            case 6:
                for (let index = 0; index < length; index++) {
                    entries.push(this.roots.set(this.readRootName(), this.data.readDoubleBE(this.addOffset(8))));
                }
                return entries;
            case 7:
                for (let index = 0; index < length; index++) {
                    const bytes: number[] = [];
                    for (let index = 0; index < this.readInt(); index++) {
                        bytes.push(this.readByte());
                    }
                    entries.push(bytes);
                }
                return entries;
            case 8:
                for (let index = 0; index < length; index++) {
                    entries.push(
                        this.data
                            .slice(this.offset + 2, this.addOffset(this.data.readUInt16BE(this.addOffset(2)), true))
                            .toString(),
                    );
                }
                return entries;
            case 9:
                for (let index = 0; index < length; index++) {
                    entries.push(this.readList());
                }
                return entries;
            case 10:
                for (let index = 0; index < length; index++) {
                    const compound = new NBT(this.data.slice(this.offset), true);
                    compound.readNBT();
                    this.addOffset(compound.offset - 1, true);
                    entries.push(compound);
                }
                return entries;
            case 11:
                for (let index = 0; index < length; index++) {
                    const ints: number[] = [];
                    for (let index = 0; index < this.readInt(); index++) {
                        ints.push(this.readInt());
                    }
                    entries.push(ints);
                }
                return entries;
            case 12:
                for (let index = 0; index < length; index++) {
                    const longs: bigint[] = [];
                    for (let index = 0; index < this.readInt(); index++) {
                        longs.push(this.readLong());
                    }
                    entries.push(longs);
                }
                return entries;
            default:
                return entries;
        }
    }

    private readRootName() {
        return this.data.slice(this.offset + 2, this.addOffset(this.readShort(), true)).toString('utf-8');
    }

    private readByte() {
        return this.data.readInt8(this.addOffset(1));
    }

    private readShort() {
        return this.data.readInt16BE(this.addOffset(2));
    }

    private readInt() {
        return this.data.readInt32BE(this.addOffset(4));
    }

    private readLong() {
        return this.data.readBigInt64BE(this.addOffset(8));
    }

    private addOffset(offset: number, retval: boolean = false) {
        if (retval) return (this.offset += offset);
        return (this.offset += offset) - offset;
    }
}
