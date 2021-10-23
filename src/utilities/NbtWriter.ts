import { Buffer } from 'node:buffer';

export default class NbtWriter {
    private bytes: Buffer = Buffer.alloc(0);

    public writeUnsignedByte(value: number): this {
        const buf: Buffer = Buffer.alloc(1);
        buf.writeUInt8(value, 0);
        this.bytes = Buffer.concat([this.bytes, buf], this.bytes.length + buf.length);
        return this;
    }

    public writeUnsignedShort(value: number): this {
        const buf: Buffer = Buffer.alloc(2);
        buf.writeUInt16BE(value, 0);
        this.bytes = Buffer.concat([this.bytes, buf], this.bytes.length + buf.length);
        return this;
    }

    public writeString(value: string): this {
        this.writeUnsignedShort(value.length);
        const buf: Buffer = Buffer.from(value, 'utf-8');
        this.bytes = Buffer.concat([this.bytes, buf], this.bytes.length + buf.length);
        return this;
    }

    public writeByte(value: number): this {
        const buf: Buffer = Buffer.alloc(1);
        buf.writeInt8(value, 0);
        this.bytes = Buffer.concat([this.bytes, buf], this.bytes.length + buf.length);
        return this;
    }

    public writeShort(value: number): this {
        const buf: Buffer = Buffer.alloc(2);
        buf.writeInt16BE(value, 0);
        this.bytes = Buffer.concat([this.bytes, buf], this.bytes.length + buf.length);
        return this;
    }

    public writeInt(value: number): this {
        const buf: Buffer = Buffer.alloc(4);
        buf.writeInt32BE(value, 0);
        this.bytes = Buffer.concat([this.bytes, buf], this.bytes.length + buf.length);
        return this;
    }

    public writeLong(value: bigint): this {
        const buf: Buffer = Buffer.alloc(8);
        buf.writeBigInt64BE(value, 0);
        this.bytes = Buffer.concat([this.bytes, buf], this.bytes.length + buf.length);
        return this;
    }

    public writeFloat(value: number): this {
        const buf: Buffer = Buffer.alloc(4);
        buf.writeFloatBE(value, 0);
        this.bytes = Buffer.concat([this.bytes, buf], this.bytes.length + buf.length);
        return this;
    }

    public writeDouble(value: number): this {
        const buf: Buffer = Buffer.alloc(8);
        buf.writeDoubleBE(value, 0);
        this.bytes = Buffer.concat([this.bytes, buf], this.bytes.length + buf.length);
        return this;
    }

    public get buffer(): Buffer {
        return this.bytes;
    }
}
