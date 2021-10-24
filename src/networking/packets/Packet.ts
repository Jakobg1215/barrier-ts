import { Buffer } from 'node:buffer';
import BlockPos from '../../types/classes/BlockPos';
import Slot from '../../types/classes/Slot';

export default class Packet {
    private bytes: Buffer;
    private offset = 0;

    public constructor(data = Buffer.alloc(0)) {
        this.bytes = data;
    }
    //#region reading
    public readBoolean(): boolean {
        if (this.readByte()) return true;
        return false;
    }

    public readByte(): number {
        return this.bytes.readInt8(this.addOffset(1));
    }

    public readUnsignedByte(): number {
        return this.bytes.readUInt8(this.addOffset(1));
    }

    public readShort(): number {
        return this.bytes.readInt16BE(this.addOffset(2));
    }

    public readUnsignedShort(): number {
        return this.bytes.readUInt16BE(this.addOffset(2));
    }

    public readInt(): number {
        return this.bytes.readInt32BE(this.addOffset(4));
    }

    public readLong(): bigint {
        return this.bytes.readBigInt64BE(this.addOffset(8));
    }

    public readFloat(): number {
        return this.bytes.readFloatBE(this.addOffset(4));
    }

    public readDouble(): number {
        return this.bytes.readDoubleBE(this.addOffset(8));
    }

    public readString(): string {
        const stringLength: number = this.readVarInt();
        return this.bytes.slice(this.offset, this.addOffset(stringLength, true)).toString('utf-8');
    }

    public readByteArray(): Buffer {
        const arrayLength: number = this.readVarInt();
        return this.bytes.slice(this.offset, this.addOffset(arrayLength, true));
    }

    public readIdentifier(): string {
        return this.readString();
    }

    public readVarInt(): number {
        let decodedInt = 0;
        let bitOffset = 0;
        let currentByte;
        do {
            currentByte = this.readUnsignedByte();
            decodedInt |= (currentByte & 0b01111111) << bitOffset;
            if (bitOffset == 35) throw new Error('VarInt is too big');
            bitOffset += 7;
        } while ((currentByte & 0b10000000) != 0);
        return decodedInt;
    }

    public readVarLong(): bigint {
        // TODO: implement read varlong
        return 0n;
    }

    public readUUID(): string {
        // TODO: implement read UUID
        return '';
    }

    public readBlockPos(): BlockPos {
        return new BlockPos();
    }

    public readSlot(): Slot {
        return new Slot();
    }

    //#endregion
    //#region writeing
    public writeBoolean(value: boolean): this {
        value ? this.writeByte(1) : this.writeByte(0);
        return this;
    }

    public writeByte(value: number): this {
        const buf = Buffer.alloc(1);
        buf.writeInt8(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeUnsignedByte(value: number): this {
        const buf = Buffer.alloc(1);
        buf.writeUInt8(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeShort(value: number): this {
        const buf = Buffer.alloc(2);
        buf.writeInt16BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeUnsignedShort(value: number): this {
        const buf = Buffer.alloc(2);
        buf.writeUInt16BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeInt(value: number): this {
        const buf = Buffer.alloc(4);
        buf.writeInt32BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeLong(value: bigint): this {
        const buf = Buffer.alloc(8);
        buf.writeBigInt64BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeUnsignedLong(value: bigint): this {
        const buf = Buffer.alloc(8);
        buf.writeBigUInt64BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeFloat(value: number): this {
        const buf = Buffer.alloc(4);
        buf.writeFloatBE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeDouble(value: number): this {
        const buf = Buffer.alloc(8);
        buf.writeDoubleBE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeBytes(value: Packet): this {
        this.bytes = Buffer.concat([this.bytes, value.bytes]);
        return this;
    }

    public writeByteArray(value: Buffer): this {
        this.writeVarInt(value.length);
        this.bytes = Buffer.concat([this.bytes, value]);
        return this;
    }

    public writeString(value: string): this {
        this.writeVarInt(Buffer.byteLength(value, 'utf-8'));
        const buf = Buffer.alloc(Buffer.byteLength(value, 'utf-8'));
        buf.write(value, 'utf-8');
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeIdentifier(value: string): this {
        this.writeString(value);
        return this;
    }

    public writeVarInt(value: number): this {
        do {
            let currentByte = value & 0b01111111;
            value >>>= 7;
            if (value !== 0) currentByte |= 0b10000000;
            this.writeUnsignedByte(currentByte);
        } while (value !== 0);
        return this;
    }

    public writeUUID(value: string): this {
        const uuid = new Packet(
            Buffer.from(
                Buffer.from(
                    value
                        .split('')
                        .filter(value => value !== '-')
                        .join(''),
                    'hex',
                ),
            ),
        );
        this.writeLong(uuid.readLong());
        this.writeLong(uuid.readLong());
        return this;
    }

    public append(data: Buffer): this {
        this.bytes = Buffer.concat([this.bytes, data]);
        return this;
    }

    //#endregion
    public getReadableBytes(): Buffer {
        return this.bytes.slice(this.offset);
    }

    public addOffset(offset: number, retval: boolean = false) {
        if (retval) return (this.offset += offset);
        return (this.offset += offset) - offset;
    }

    public buildPacket(id: number): Buffer {
        const pkId = new Packet();
        pkId.writeVarInt(id);
        const pkLength = new Packet();
        pkLength.writeVarInt(pkId.bytes.byteLength + this.bytes.byteLength);
        const pk = Buffer.concat([pkLength.bytes, pkId.bytes]);
        return Buffer.concat([pk, this.bytes]);
    }
}
