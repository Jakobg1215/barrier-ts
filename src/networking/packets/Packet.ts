import { Buffer } from 'node:buffer';
import type Chat from '../../types/Chat';
import NBT from '../../types/NBT';
import Slot from '../../types/Slot';
import Vector3 from '../../types/Vector3';

export default class Packet {
    public static readonly id: number;
    private bytes: Buffer;
    private offset = 0;
    public constructor(data = Buffer.alloc(0)) {
        this.bytes = data;
    }
    public readBoolean() {
        if (this.readByte()) return true;
        return false;
    }
    public readByte() {
        return this.bytes.readInt8(this.addOffset(1));
    }
    public readUnsignedByte() {
        return this.bytes.readUInt8(this.addOffset(1));
    }
    public readShort() {
        return this.bytes.readInt16BE(this.addOffset(2));
    }
    public readUnsignedShort() {
        return this.bytes.readUInt16BE(this.addOffset(2));
    }
    public readInt() {
        return this.bytes.readInt32BE(this.addOffset(4));
    }
    public readLong() {
        return this.bytes.readBigInt64BE(this.addOffset(8));
    }
    public readFloat() {
        return this.bytes.readFloatBE(this.addOffset(4));
    }
    public readDouble() {
        return this.bytes.readDoubleBE(this.addOffset(8));
    }
    public readString() {
        return this.bytes.slice(this.offset + 1, this.addOffset(this.readVarInt(), true)).toString('utf-8');
    }
    public readIdentifier() {
        return this.readString();
    }
    public readVarInt() {
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
    // FIXME: This does not read a long, only to a Int.
    public readVarLong() {
        let decodedLong = 0;
        let bitOffset = 0;
        let currentByte;
        do {
            currentByte = this.readUnsignedByte();
            decodedLong |= (currentByte & 0b01111111) << bitOffset;
            if (bitOffset == 70) throw new Error('VarLong is too big');
            bitOffset += 7;
        } while ((currentByte & 0b10000000) != 0);
        return decodedLong;
    }
    public readSlot() {
        const slot = new Slot();
        slot.Present = this.readBoolean();
        if (slot.Present) {
            slot.ItemID = this.readVarInt();
            slot.ItemCount = this.readByte();
            slot.NBT = new NBT(this.bytes.slice(this.offset)).readNBT();
        }
        return slot;
    }
    public readPosition() {
        const bytes = this.bytes.slice(this.offset, this.addOffset(8, true));
        const xbytes = bytes.slice(0, 4).toJSON().data;
        const ybytes = bytes.slice(4, 7).toJSON().data;
        return new Vector3(
            Buffer.from([xbytes[0], xbytes[1], xbytes[2], xbytes[3] - (xbytes[3] & 63)]).readInt32BE() / 64,
            bytes.readUInt8(7),
            Buffer.from([
                (ybytes[0] & 63) > 0 ? (ybytes[0] & 63) + 192 : 0,
                ybytes[1],
                ybytes[2],
                ybytes[3],
            ]).readInt32BE() /
                256 /
                16,
        );
    }
    public readUUID() {
        return `${Number(this.readLong()).toString()}${Number(this.readLong()).toString()}`;
    }
    public readByteArray(length: number) {
        const bytes: number[] = [];
        for (let index = 0; index < length; index++) {
            bytes.push(this.readByte());
        }
        return bytes;
    }

    public writeBoolean(value: boolean) {
        value ? this.writeByte(1) : this.writeByte(0);
    }
    public writeByte(value: number) {
        const buf = Buffer.alloc(1);
        buf.writeInt8(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
    }
    public writeUnsignedByte(value: number) {
        const buf = Buffer.alloc(1);
        buf.writeUInt8(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
    }
    public writeShort(value: number) {
        const buf = Buffer.alloc(2);
        buf.writeInt16BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
    }
    public writeUnsignedShort(value: number) {
        const buf = Buffer.alloc(2);
        buf.writeUInt16BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
    }
    public writeInt(value: number) {
        const buf = Buffer.alloc(4);
        buf.writeInt32BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
    }
    public writeLong(value: bigint) {
        const buf = Buffer.alloc(8);
        buf.writeBigInt64BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
    }
    public writeUnsignedLong(value: bigint) {
        const buf = Buffer.alloc(8);
        buf.writeBigUInt64BE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
    }
    public writeFloat(value: number): void {
        const buf = Buffer.alloc(4);
        buf.writeFloatBE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
    }
    public writeDouble(value: number): void {
        const buf = Buffer.alloc(8);
        buf.writeDoubleBE(value);
        this.bytes = Buffer.concat([this.bytes, buf]);
    }
    public writeString(value: string) {
        this.writeVarInt(Buffer.byteLength(value, 'utf-8'));
        const buf = Buffer.alloc(Buffer.byteLength(value, 'utf-8'));
        buf.write(value, 'utf-8');
        this.bytes = Buffer.concat([this.bytes, buf]);
    }
    public writeChat(chat: Chat) {
        this.writeString(chat.toJSON());
    }
    public writeIdentifier(value: string) {
        this.writeString(value);
    }
    public writeVarInt(value: number) {
        do {
            let currentByte = value & 0b01111111;
            value >>>= 7;
            if (value !== 0) currentByte |= 0b10000000;
            this.writeUnsignedByte(currentByte);
        } while (value !== 0);
    }
    public writeVarLong(value: number) {
        do {
            let currentByte = value & 0b01111111;
            value >>>= 7;
            if (value != 0) currentByte |= 0b10000000;
            this.writeByte(currentByte);
        } while (value !== 0);
    }
    public writeEntityMetadata() {}
    public writeSlot(slot: Slot) {
        this.writeBoolean(slot.Present);
        if (slot.Present) {
            this.writeVarInt(slot.ItemID ?? 0);
            this.writeByte(slot.ItemCount ?? 0);
            this.append(slot.NBT?.bytes.slice(-Math.abs(slot.NBT?.offset)) ?? Buffer.alloc(1));
            this.addOffset(slot.NBT?.offset ?? 0);
        }
    }
    public writeNBTTag(_NBT: NBT) {}
    public writePosition(position: Vector3) {
        const zbuf = Buffer.alloc(4);
        zbuf.writeInt32BE(position.getZ() * 16);
        let zdata = zbuf.toJSON().data;
        if (position.getZ() < 0) {
            zdata[0] = zdata[0] - 192;
        }
        const xbuf = Buffer.alloc(4);
        xbuf.writeInt32BE(position.getX() * 64);
        let xdata = xbuf.toJSON().data;
        if (position.getZ() < 0) {
            xdata[3] = xdata[3] + zdata[0];
        }
        const ybuf = Buffer.alloc(1);
        ybuf.writeUInt8(position.getY());

        this.append(Buffer.concat([Buffer.from(xdata), Buffer.from(zdata.slice(1)), ybuf]));
    }
    public writeAngle(value: number) {
        this.writeUnsignedByte(value);
    }
    public writeUUID(value: string) {
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
    }
    public writeByteArray(bytes: Buffer) {
        bytes.forEach(v => this.writeByte(v));
    }

    public static fromUnsignedByte(value: number) {
        const buf = Buffer.alloc(1);
        buf.writeUInt8(value);
        return buf;
    }
    public static fromVarInt(value: number) {
        let buf = Buffer.alloc(0);
        do {
            let temp = value & 0b01111111;
            value >>>= 7;
            if (value != 0) {
                temp |= 0b10000000;
            }
            buf = Buffer.concat([buf, this.fromUnsignedByte(temp)]);
        } while (value != 0);
        return buf;
    }
    public static fromString(value: string) {
        const buf = Buffer.alloc(Buffer.byteLength(value, 'utf-8'));
        buf.write(value, 'utf-8');
        return Buffer.concat([this.fromVarInt(Buffer.byteLength(value, 'utf-8')), buf]);
    }

    public buildPacket(id: number): Buffer {
        const pkId = new Packet();
        pkId.writeVarInt(id);
        const pkLength = new Packet();
        pkLength.writeVarInt(pkId.bytes.byteLength + this.bytes.byteLength);
        const pk = Buffer.concat([pkLength.bytes, pkId.bytes]);
        return Buffer.concat([pk, this.bytes]);
    }
    public append(data: Buffer): void {
        this.bytes = Buffer.concat([this.bytes, data]);
        this.offset += data.byteLength;
    }
    public getBytes() {
        return this.bytes;
    }
    public getOffset() {
        return this.offset;
    }
    public decrypt() {}
    public encrypt() {}
    public clearBytes() {
        this.bytes = Buffer.alloc(0);
    }
    public addOffset(offset: number, retval: boolean = false) {
        if (retval) return (this.offset += offset);
        return (this.offset += offset) - offset;
    }
}
