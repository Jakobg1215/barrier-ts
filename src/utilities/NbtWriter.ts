import { Buffer } from 'node:buffer';
import { TagIds } from '../types/enums/NbtTags';

export default class NbtWriter {
    private bytes: Buffer = Buffer.alloc(0);

    //#region TAGS

    public writeTagEnd(): this {
        return this.writeTagType(TagIds.END);
    }

    public writeTagByte(byte: number, name?: string | null): this {
        if (name !== null) {
            this.writeTagType(TagIds.BYTE).writeTagName(name ?? '');
        }
        const tagData = Buffer.alloc(1);
        tagData.writeInt8(byte);
        this.bytes = Buffer.concat([this.bytes, tagData]);
        return this;
    }

    public writeTagShort(short: number, name?: string | null): this {
        if (name !== null) {
            this.writeTagType(TagIds.SHORT).writeTagName(name ?? '');
        }
        const tagData = Buffer.alloc(2);
        tagData.writeInt16BE(short);
        this.bytes = Buffer.concat([this.bytes, tagData]);
        return this;
    }

    public writeTagInt(int: number, name?: string | null): this {
        if (name !== null) {
            this.writeTagType(TagIds.INT).writeTagName(name ?? '');
        }
        const tagData = Buffer.alloc(4);
        tagData.writeInt32BE(int);
        this.bytes = Buffer.concat([this.bytes, tagData]);
        return this;
    }

    public writeTagLong(long: bigint, name?: string | null): this {
        if (name !== null) {
            this.writeTagType(TagIds.LONG).writeTagName(name ?? '');
        }
        const tagData = Buffer.alloc(8);
        tagData.writeBigInt64BE(long);
        this.bytes = Buffer.concat([this.bytes, tagData]);
        return this;
    }

    public writeTagFloat(float: number, name?: string | null): this {
        if (name !== null) {
            this.writeTagType(TagIds.FLOAT).writeTagName(name ?? '');
        }
        const tagData = Buffer.alloc(4);
        tagData.writeFloatBE(float);
        this.bytes = Buffer.concat([this.bytes, tagData]);
        return this;
    }

    public writeTagDouble(double: number, name?: string | null): this {
        if (name !== null) {
            this.writeTagType(TagIds.DOUBLE).writeTagName(name ?? '');
        }
        const tagData = Buffer.alloc(8);
        tagData.writeDoubleBE(double);
        this.bytes = Buffer.concat([this.bytes, tagData]);
        return this;
    }

    public writeTagByteArray(bytes: number[], name?: string | null): this {
        if (name !== null) {
            this.writeTagType(TagIds.BYTEARRAY).writeTagName(name ?? '');
        }
        this.writeSignedInteger(bytes.length);
        const tagData = Buffer.alloc(bytes.length);
        let offset = 0;
        bytes.forEach((byte: number): void => void (offset += tagData.writeInt8(byte, offset) - offset));
        this.bytes = Buffer.concat([this.bytes, tagData]);
        return this;
    }

    public writeTagString(string: string, name?: string | null): this {
        if (name !== null) {
            this.writeTagType(TagIds.STRING).writeTagName(name ?? '');
        }
        return this.writeUnsignedShort(string.length).writeString(string);
    }

    public writeTagList(type: TagIds, length: number, name?: string | null): this {
        if (name !== null) {
            this.writeTagType(TagIds.LIST).writeTagName(name ?? '');
        }
        return this.writeUnsignedByte(type).writeSignedInteger(length);
    }

    public writeTagCompound(name?: string | null): this {
        if (name !== null) {
            this.writeTagType(TagIds.COMPOUND).writeTagName(name ?? '');
        }
        return this;
    }

    public writeTagIntArray(ints: number[], name?: string | null): this {
        if (name !== null) {
            this.writeTagType(TagIds.INTARRAY).writeTagName(name ?? '');
        }
        this.writeSignedInteger(ints.length);
        const tagData = Buffer.alloc(ints.length * 4);
        let offset = 0;
        ints.forEach((int: number): void => void (offset += tagData.writeInt32BE(int, offset) - offset));
        this.bytes = Buffer.concat([this.bytes, tagData]);
        return this;
    }

    public writeTagLongArray(longs: bigint[], name?: string | null): this {
        if (name !== null) {
            this.writeTagType(TagIds.LONGARRAY).writeTagName(name ?? '');
        }
        this.writeSignedInteger(longs.length);
        const tagData = Buffer.alloc(longs.length * 8);
        let offset = 0;
        longs.forEach((long: bigint): void => void (offset += tagData.writeBigInt64BE(long, offset) - offset));
        this.bytes = Buffer.concat([this.bytes, tagData]);
        return this;
    }

    //#endregion

    //#region WRITERS

    private writeTagName(name: string): this {
        return this.writeUnsignedShort(name.length).writeString(name);
    }

    private writeTagType(tag: TagIds): this {
        return this.writeUnsignedByte(tag);
    }

    private writeString(string: string): this {
        this.bytes = Buffer.concat([this.bytes, Buffer.from(string, 'utf-8')]);
        return this;
    }

    private writeUnsignedByte(byte: number): this {
        const byteBuf = Buffer.alloc(1);
        byteBuf.writeUInt8(byte);
        this.bytes = Buffer.concat([this.bytes, byteBuf]);
        return this;
    }

    private writeUnsignedShort(short: number): this {
        const shortBuf = Buffer.alloc(2);
        shortBuf.writeUInt16BE(short);
        this.bytes = Buffer.concat([this.bytes, shortBuf]);
        return this;
    }

    private writeSignedInteger(integer: number) {
        const integerBuf = Buffer.alloc(4);
        integerBuf.writeInt32BE(integer);
        this.bytes = Buffer.concat([this.bytes, integerBuf]);
        return this;
    }

    //#endregion

    public get buffer(): Buffer {
        return this.bytes;
    }
}
