export default class Packet {
    private buffer: Buffer;
    private offset: number;
    public constructor(buffer: Buffer = Buffer.alloc(0), offset: number = 0) {
        this.buffer = buffer;
        this.offset = offset;
    }
    public readBoolean(): boolean {
        return this.readByte() ? true : false;
    }
    public readByte(): number {
        return this.buffer.readInt8(this.addOffset(1));
    }
    public readUnsignedByte(): number {
        return this.buffer.readUInt8(this.addOffset(1));
    }
    public readShort(): number {
        return this.buffer.readInt16BE(this.addOffset(2));
    }
    public readUnsignedShort(): number {
        return this.buffer.readUInt16BE(this.addOffset(2));
    }
    public readInt(): number {
        return this.buffer.readInt32BE(this.addOffset(4));
    }
    public readLong(): bigint {
        return this.buffer.readBigInt64BE(this.addOffset(8));
    }
    public readUnsignedLong(): bigint {
        return this.buffer.readBigUInt64BE(this.addOffset(8));
    }
    public readFloat(): number {
        return this.buffer.readFloatBE(this.addOffset(4));
    }
    public readDouble(): number {
        return this.buffer.readDoubleBE(this.addOffset(8));
    }
    public readString(): string {
        return this.buffer.slice(this.offset + 1, this.addOffset(this.readVarInt(), true)).toString("utf-8");
    }
    public readVarInt(): number {
        let i = 0;
        let j = 0;
        while (true) {
            let k = this.readUnsignedByte();
            i |= (k & 127) << j++ * 7;
            if (j > 5) throw new Error("VarInt too big");
            if ((k & 128) != 128) break;
        }
        return i;
    }
    public readVarLong(): number {
        let i = 0;
        let j = 0;
        while (true) {
            let k = this.readUnsignedByte();
            i |= (k & 127) << j++ * 7;
            if (j > 10) throw new Error("VarLong too big");
            if ((k & 128) != 128) break;
        }
        return i;
    }
    public readUUID(): string {
        return `${Number(this.readLong()).toString()}${Number(this.readLong()).toString()}`;
    }

    public writeBoolean(value: boolean): void {
        value ? this.writeByte(1) : this.writeByte(0);
    }
    public writeByte(value: number): void {
        const buf = Buffer.alloc(1);
        buf.writeInt8(value);
        this.buffer = Buffer.concat([this.buffer, buf]);
    }
    public writeUnsignedByte(value: number): void {
        const buf = Buffer.alloc(1);
        buf.writeUInt8(value);
        this.buffer = Buffer.concat([this.buffer, buf]);
    }
    public writeShort(value: number): void {
        const buf = Buffer.alloc(2);
        buf.writeInt16BE(value);
        this.buffer = Buffer.concat([this.buffer, buf]);
    }
    public writeUnsignedShort(value: number): void {
        const buf = Buffer.alloc(2);
        buf.writeUInt16BE(value);
        this.buffer = Buffer.concat([this.buffer, buf]);
    }
    public writeInt(value: number): void {
        const buf = Buffer.alloc(4);
        buf.writeInt32BE(value);
        this.buffer = Buffer.concat([this.buffer, buf]);
    }
    public writeLong(value: bigint): void {
        const buf = Buffer.alloc(8);
        buf.writeBigInt64BE(value);
        this.buffer = Buffer.concat([this.buffer, buf]);
    }
    public writeUnsignedLong(value: bigint): void {
        const buf = Buffer.alloc(8);
        buf.writeBigUInt64BE(value);
        this.buffer = Buffer.concat([this.buffer, buf]);
    }
    public writeFloat(value: number): void {
        const buf = Buffer.alloc(4);
        buf.writeFloatBE(value);
        this.buffer = Buffer.concat([this.buffer, buf]);
    }
    public writeDouble(value: number): void {
        const buf = Buffer.alloc(8);
        buf.writeDoubleBE(value);
        this.buffer = Buffer.concat([this.buffer, buf]);
    }
    public writeString(value: string): void {
        this.writeVarInt(Buffer.byteLength(value, "utf-8"));
        const buf = Buffer.alloc(Buffer.byteLength(value, "utf-8"));
        buf.write(value, "utf-8");
        this.buffer = Buffer.concat([this.buffer, buf]);
    }
    public writeVarInt(value: number): void {
        while (true) {
            if ((value & 4294967168) === 0) {
                this.writeUnsignedByte(value);
                return;
            }
            this.writeUnsignedByte(value & 127 | 128);
            value >>>= 7;
        }
    }
    public writeVarLong(value: number): void {
        while (true) {
            if ((value & 4294967168) === 0) {
                this.writeUnsignedByte(value);
                return;
            }
            this.writeUnsignedByte(value & 127 | 128);
            value >>>= 7;
        }
    }
    public writeUUID(value: string): void {
        const uuid = value.split("").filter((value: string) => value !== "-").join("");
        this.writeLong(BigInt(parseInt(uuid.slice(0, 17))));
        this.writeLong(BigInt(parseInt(uuid.slice(18, 36))));
    }

    public addOffset(size: number, retval: boolean = false): number {
        if (retval) return this.offset += size;
        return (this.offset += size) - size;
    }

    public buildPacket(id: number): Buffer {
        const pkId = new Packet();
        pkId.writeVarInt(id);
        const pkLength = new Packet();
        pkLength.writeVarInt((pkId.buffer.byteLength + this.buffer.byteLength));
        const pk = Buffer.concat([pkLength.buffer, pkId.buffer])
        return Buffer.concat([pk, this.buffer]);
    }
    public append(data: Buffer): void {
        this.buffer = Buffer.concat([this.buffer, data]);
        this.addOffset(data.byteLength, true);
    }
    public getBuffer(): Buffer {
        return this.buffer;
    }
    public getOffset(): number {
        return this.offset;
    }
}