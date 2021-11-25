import { Buffer } from 'node:buffer';
import BlockPos from '../../types/classes/BlockPos';
import type Chat from '../../types/classes/Chat';
import Slot from '../../types/classes/Slot';
import NbtReader from '../../utilities/NbtReader';

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
            currentByte = this.readByte();
            decodedInt |= (currentByte & 0b01111111) << bitOffset;
            if (bitOffset == 35) throw new RangeError('VarInt is too big');
            bitOffset += 7;
        } while ((currentByte & 0b10000000) != 0);
        return decodedInt;
    }

    public readVarLong(): bigint {
        let value = 0n;
        let bitOffset = 0n;
        let currentByte;
        do {
            if (bitOffset == 70n) throw new RangeError('VarLong is too big');

            currentByte = this.readByte();
            value |= (BigInt(currentByte) & 0b01111111n) << bitOffset;

            bitOffset += 7n;
        } while ((currentByte & 0b10000000) !== 0);
        return new BigInt64Array([value]).at(0)!; // There is probably a better way to do this but this is fine for now
    }

    public readUUID(): string {
        return this.readLong().toString(16) + this.readLong().toString(16);
    }

    public readBlockPos(): BlockPos {
        return BlockPos.fromBuffer(this.bytes.slice(this.offset, this.addOffset(8, true)));
    }

    public readSlot(): Slot {
        if (!this.readBoolean()) {
            return Slot.Empty;
        }
        return new Slot(
            true,
            this.readVarInt(),
            this.readByte(),
            this.bytes.slice(this.offset, this.addOffset(NbtReader.readData(this.bytes.slice(this.offset))[1], true)),
        );
    }

    //#endregion
    //#region writeing

    public writeBoolean(value: boolean): this {
        value ? this.writeByte(1) : this.writeByte(0);
        return this;
    }

    public writeByte(value: number): this {
        const buf = Buffer.alloc(1);
        buf.writeInt8(new Int8Array([value]).at(0)!);
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

    public writeChat(chat: Chat): this {
        return this.writeString(chat.toString());
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

    public writeVarLong(value: bigint): this {
        let bitVal: string = new BigUint64Array([value]).at(0)!.toString(2).padStart(64, '0');
        do {
            let currentByte: bigint = BigInt(`0b${bitVal}`) & 0b01111111n;
            bitVal = bitVal.slice(0, -7);
            if (BigInt(`0b0${bitVal}`) !== 0n) currentByte |= 0b10000000n;
            this.writeUnsignedByte(Number(currentByte));
        } while (BigInt(`0b0${bitVal}`) !== 0n);
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

    public writeBlockPos(blockPos: BlockPos): this {
        this.writeUnsignedLong(blockPos.toBigInt());
        return this;
    }

    public writeNbt(nbt: Buffer): this {
        this.bytes = Buffer.concat([this.bytes, nbt]);
        return this;
    }

    public writeSlot(slot: Slot): this {
        if (slot.present) {
            return this.writeBoolean(true).writeVarInt(slot.id).writeByte(slot.count).writeNbt(slot.nbt);
        }
        return this.writeBoolean(false);
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
        const packetId = new Packet().writeVarInt(id);
        const packetLength = new Packet().writeVarInt(packetId.bytes.length + this.bytes.length);
        return Buffer.concat([packetLength.bytes, packetId.bytes, this.bytes]);
    }

    public static sizeVarInt(val: number): number {
        return new this().writeVarInt(val).bytes.length;
    }
}
