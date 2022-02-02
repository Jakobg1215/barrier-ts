import { Buffer } from 'node:buffer';
import BlockPos from '../types/classes/BlockPos';
import type Chat from '../types/classes/Chat';
import Item from '../types/classes/Item';
import NameSpace from '../types/classes/NameSpace';
import UUID from '../types/classes/UUID';
import NbtReader from '../utilitys/NbtReader';

export default class DataBuffer {
    private bytes: Buffer;
    private offset = 0;

    public constructor(data = Buffer.allocUnsafe(0)) {
        this.bytes = data;
    }

    public readBlockPos(): BlockPos {
        return BlockPos.fromBuffer(this.bytes.slice(this.offset, this.getOffset(8, true)));
    }

    public readBoolean(): boolean {
        return !!this.readByte();
    }

    public readByte(): number {
        return this.bytes.readInt8(this.getOffset(1));
    }

    public readByteArray(): Buffer {
        const size = this.readVarInt();

        return this.bytes.slice(this.offset, this.getOffset(size, true));
    }

    public readDouble(): number {
        return this.bytes.readDoubleBE(this.getOffset(8));
    }

    public readFloat(): number {
        return this.bytes.readFloatBE(this.getOffset(4));
    }

    public readInt(): number {
        return this.bytes.readInt32BE(this.getOffset(4));
    }

    public readItem(): Item {
        if (!this.readBoolean()) {
            return Item.Empty;
        }
        return new Item(
            true,
            this.readVarInt(),
            this.readByte(),
            this.bytes.slice(this.offset, this.getOffset(NbtReader.readData(this.bytes.slice(this.offset))[1], true)),
        );
    }

    public readLong(): bigint {
        return this.bytes.readBigInt64BE(this.getOffset(8));
    }

    public readNameSpace(): NameSpace {
        const [name, value] = this.readString().split(':');
        if (!name || !value) throw new Error('Invalid namespace');
        return new NameSpace(name, value);
    }

    public readShort(): number {
        return this.bytes.readInt16BE(this.getOffset(2));
    }

    public readString(maxSize = 32767): string {
        const size = this.readVarInt();
        if (size > maxSize) throw new Error('The encoded string is longer than expected!');
        return this.bytes.slice(this.offset, this.getOffset(size, true)).toString();
    }

    public readStringArray(maxStringSize?: number): string[] {
        const size = this.readVarInt();
        const stringArray: string[] = [];
        for (let index = 0; index < size; index++) stringArray.push(this.readString(maxStringSize));
        return stringArray;
    }

    public readUUID(): UUID {
        return new UUID(this.readLong().toString(16) + this.readLong().toString(16));
    }

    public readUnsignedShort(): number {
        return this.bytes.readUInt16BE(this.getOffset(2));
    }

    public readUnsignedByte(): number {
        return this.bytes.readUInt8(this.getOffset(1));
    }

    public readVarInt(): number {
        let decodedInt = 0;
        let bitOffset = 0;
        let currentByte;
        do {
            currentByte = this.readByte();
            decodedInt |= (currentByte & 0b01111111) << bitOffset;
            if (bitOffset === 35) throw new RangeError('VarInt is too big');
            bitOffset += 7;
        } while ((currentByte & 0b10000000) != 0);
        return decodedInt;
    }

    public readVarLong(): bigint {
        let value = 0n;
        let bitOffset = 0n;
        let currentByte;
        do {
            if (bitOffset === 70n) throw new RangeError('VarLong is too big');
            currentByte = this.readByte();
            value |= (BigInt(currentByte) & 0b01111111n) << bitOffset;
            bitOffset += 7n;
        } while ((currentByte & 0b10000000) !== 0);
        return BigInt64Array.from([value]).at(0)!;
    }

    public getReadableBytes(): DataBuffer {
        return new DataBuffer(this.bytes.slice(this.offset));
    }

    public writeLong(value: bigint): this {
        const buf = Buffer.allocUnsafe(8);
        buf.writeBigInt64BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeString(value: string, maxLength = 32767): this {
        const bufString = Buffer.from(value);
        if (bufString.length > maxLength) throw new Error('String is bigger than expected!');
        this.writeVarInt(bufString.length);
        this.bytes = Buffer.concat([this.bytes, bufString]);
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

    public writeUnsignedByte(value: number): this {
        this.bytes = Buffer.concat([this.bytes, Buffer.from([value])]);
        return this;
    }

    public writeNameSpace(value: NameSpace): this {
        this.writeString(value.toString());
        return this;
    }

    public writeBytes(value: DataBuffer): this {
        this.bytes = Buffer.concat([this.bytes, value.buffer]);
        return this;
    }

    public writeUUID(value: UUID): this {
        this.bytes = Buffer.concat([this.bytes, value.toBuffer()]);
        return this;
    }

    public writeByteArray(value: Buffer): this {
        this.writeVarInt(value.length);
        this.bytes = Buffer.concat([this.bytes, value]);
        return this;
    }

    public writeChat(value: Chat): this {
        this.writeString(value.toString(), 262144);
        return this;
    }

    public writeBoolean(value: boolean): this {
        value ? this.writeByte(1) : this.writeByte(0);
        return this;
    }

    public writeByte(value: number): this {
        this.bytes = Buffer.concat([this.bytes, Buffer.from(Int8Array.from([value]).buffer)]);
        return this;
    }

    public writeShort(value: number): this {
        const buf = Buffer.allocUnsafe(2);
        buf.writeInt16BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeUnsignedShort(value: number): this {
        const buf = Buffer.allocUnsafe(2);
        buf.writeUInt16BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeInt(value: number): this {
        const buf = Buffer.allocUnsafe(4);
        buf.writeInt32BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeUnsignedLong(value: bigint): this {
        const buf = Buffer.allocUnsafe(8);
        buf.writeBigUInt64BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeFloat(value: number): this {
        const buf = Buffer.allocUnsafe(4);
        buf.writeFloatBE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeDouble(value: number): this {
        const buf = Buffer.allocUnsafe(8);
        buf.writeDoubleBE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
        return this;
    }

    public writeVarLong(value: bigint): this {
        let bitVal: string = BigUint64Array.from([value]).at(0)!.toString(2).padStart(64, '0');
        do {
            let currentByte: bigint = BigInt(`0b${bitVal}`) & 0b01111111n;
            bitVal = bitVal.slice(0, -7);
            if (BigInt(`0b0${bitVal}`) !== 0n) currentByte |= 0b10000000n;
            this.writeUnsignedByte(Number(currentByte));
        } while (BigInt(`0b0${bitVal}`) !== 0n);
        return this;
    }

    public writeBlockPos(value: BlockPos): this {
        this.writeUnsignedLong(value.toBigInt());
        return this;
    }

    public writeNbt(value: Buffer): this {
        this.bytes = Buffer.concat([this.bytes, value]);
        return this;
    }

    public writeItem(value: Item): this {
        if (value.present) {
            return this.writeBoolean(true).writeVarInt(value.id).writeByte(value.count).writeNbt(value.nbt);
        }
        return this.writeBoolean(false);
    }

    public append(value: this | Buffer): this {
        if (Buffer.isBuffer(value)) {
            this.bytes = Buffer.concat([this.bytes, value]);
            return this;
        }
        this.bytes = Buffer.concat([this.bytes, value.bytes]);
        return this;
    }

    private getOffset(offset: number, reveal = false): number {
        if (reveal) return (this.offset += offset);
        return (this.offset += offset) - offset;
    }

    public addOffset(offset: number): void {
        this.offset += offset;
    }

    public get buffer(): Buffer {
        return this.bytes;
    }

    public get readOffset(): number {
        return this.offset;
    }
}
