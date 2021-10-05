import { Buffer } from 'node:buffer';

export default class NBT {
    public readonly name: string;
    public readonly roots: Map<string, any> = new Map();
    private data: Buffer;
    private offSet = 0;
    public constructor(data: Buffer = Buffer.alloc(0), list: boolean = false) {
        this.data = data;
        if (!(list || data.readInt8() === 0)) {
            this.readByte();
            this.name = this.readRootName();
        } else {
            this.name = '';
        }
    }

    public get bytes(): Buffer {
        return this.data;
    }

    public get offset(): number {
        return this.offSet;
    }

    public readNBT() {
        while (true) {
            switch (this.readByte()) {
                case tagType.end:
                    return this;
                case tagType.byte:
                    this.roots.set(this.readRootName(), this.readByte());
                    break;
                case tagType.short:
                    this.roots.set(this.readRootName(), this.readShort());
                    break;
                case tagType.int:
                    this.roots.set(this.readRootName(), this.readInt());
                    break;
                case tagType.long:
                    this.roots.set(this.readRootName(), this.readLong());
                    break;
                case tagType.float:
                    this.roots.set(this.readRootName(), this.data.readFloatBE(this.addOffset(4)));
                    break;
                case tagType.double:
                    this.roots.set(this.readRootName(), this.data.readDoubleBE(this.addOffset(8)));
                    break;
                case tagType.bytearray: {
                    const bytesName = this.readRootName();
                    const bytes: number[] = [];
                    const length = this.readInt();
                    for (let index = 0; index < length; index++) {
                        bytes.push(this.readByte());
                    }
                    this.roots.set(bytesName, bytes);
                    break;
                }
                case tagType.string:
                    this.roots.set(
                        this.readRootName(),
                        this.data
                            .slice(this.offSet + 2, this.addOffset(this.data.readUInt16BE(this.addOffset(2)), true))
                            .toString(),
                    );
                    break;
                case tagType.list:
                    this.roots.set(this.readRootName(), this.readList());
                    break;
                case tagType.compound:
                    const compound = new NBT(this.data.slice(this.offSet - 1));
                    compound.readNBT();
                    this.addOffset(compound.offSet - 1, true);
                    this.roots.set(compound.name, compound);
                    break;
                case tagType.intarray: {
                    const intsName = this.readRootName();
                    const ints: number[] = [];
                    const legnth = this.readInt();
                    for (let index = 0; index < legnth; index++) {
                        ints.push(this.readInt());
                    }
                    this.roots.set(intsName, ints);
                    break;
                }
                case tagType.longarray: {
                    const longsName = this.readRootName();
                    const longs: bigint[] = [];
                    const legnth = this.readInt();
                    for (let index = 0; index < legnth; index++) {
                        longs.push(this.readLong());
                    }
                    this.roots.set(longsName, longs);
                    break;
                }
            }
        }
    }

    private readList() {
        const entries: any[] = [];
        const type = this.readByte();
        const length = this.readInt();
        switch (type) {
            case tagType.byte:
                for (let index = 0; index < length; index++) {
                    entries.push(this.readByte());
                }
                return entries;
            case tagType.short:
                for (let index = 0; index < length; index++) {
                    entries.push(this.readShort());
                }
                return entries;
            case tagType.int:
                for (let index = 0; index < length; index++) {
                    entries.push(this.readInt);
                }
                return entries;
            case tagType.long:
                for (let index = 0; index < length; index++) {
                    entries.push(this.readLong());
                }
                return entries;
            case tagType.float:
                for (let index = 0; index < length; index++) {
                    entries.push(this.roots.set(this.readRootName(), this.data.readFloatBE(this.addOffset(4))));
                }
                return entries;
            case tagType.double:
                for (let index = 0; index < length; index++) {
                    entries.push(this.roots.set(this.readRootName(), this.data.readDoubleBE(this.addOffset(8))));
                }
                return entries;
            case tagType.bytearray: {
                for (let index = 0; index < length; index++) {
                    const bytes: number[] = [];
                    const length = this.readInt();
                    for (let index = 0; index < length; index++) {
                        bytes.push(this.readByte());
                    }
                    entries.push(bytes);
                }
                return entries;
            }
            case tagType.string:
                for (let index = 0; index < length; index++) {
                    entries.push(
                        this.data
                            .slice(this.offSet + 2, this.addOffset(this.data.readUInt16BE(this.addOffset(2)), true))
                            .toString(),
                    );
                }
                return entries;
            case tagType.list:
                for (let index = 0; index < length; index++) {
                    entries.push(this.readList());
                }
                return entries;
            case tagType.compound:
                for (let index = 0; index < length; index++) {
                    const compound = new NBT(this.data.slice(this.offSet), true);
                    compound.readNBT();
                    this.addOffset(compound.offSet - 1, true);
                    entries.push(compound);
                }
                return entries;
            case tagType.intarray: {
                for (let index = 0; index < length; index++) {
                    const ints: number[] = [];
                    const length = this.readInt();
                    for (let index = 0; index < length; index++) {
                        ints.push(this.readInt());
                    }
                    entries.push(ints);
                }
                return entries;
            }
            case tagType.longarray: {
                for (let index = 0; index < length; index++) {
                    const longs: bigint[] = [];
                    const length = this.readInt();
                    for (let index = 0; index < length; index++) {
                        longs.push(this.readLong());
                    }
                    entries.push(longs);
                }
                return entries;
            }
            default:
                return entries;
        }
    }

    private readRootName() {
        return this.data.slice(this.offSet + 2, this.addOffset(this.readShort(), true)).toString('utf-8');
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
        if (retval) return (this.offSet += offset);
        return (this.offSet += offset) - offset;
    }
}

enum tagType {
    end,
    byte,
    short,
    int,
    long,
    float,
    double,
    bytearray,
    string,
    list,
    compound,
    intarray,
    longarray,
}
