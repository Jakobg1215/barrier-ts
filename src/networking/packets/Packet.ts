import type Chat from "../../types/Chat";
import Slot from "../../types/Slot";

export default class Packet {
    public static readonly id: number;
    private bytes;
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
        return this.bytes.slice(this.offset + 1, this.addOffset(this.readVarInt(), true)).toString("utf-8");
    }
    public readIdentifier() {
        return this.readString();
    }
    public readVarInt() {
        let numRead = 0;
        let result = 0;
        let read;
        do {
            read = this.readUnsignedByte();
            let value = (read & 0b01111111);
            result |= (value << (7 * numRead));
            numRead++;
            if (numRead > 5) {
                throw new Error("VarInt is too big");
            }
        } while ((read & 0b10000000) != 0);
        return result;
    }
    // FIXME: This does not read a long, only to a Int.
    public readVarLong() {
        let numRead = 0;
        let result = 0;
        let read;
        do {
            read = this.readUnsignedByte();
            let value = (read & 0b01111111);
            result |= (value << (7 * numRead));

            numRead++;
            if (numRead > 10) {
                throw new Error("VarLong is too big");
            }
        } while ((read & 0b10000000) != 0);

        return BigInt(result);
    }
    public readSlot() {
        const slot = new Slot();
        slot.Present = this.readBoolean();
        if (slot.Present) {
            slot.ItemID = this.readVarInt()
            slot.ItemCount = this.readByte();
            slot.NBT = this.bytes.slice(this.offset);
        }
        return slot;
    }
    public readPosition() {
        let val = this.bytes.readBigUInt64BE(this.addOffset(8));
        console.log(val);
        return {
            x: 0,
            y: 0,
            z: 0
        };
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
        this.writeVarInt(Buffer.byteLength(value, "utf-8"));
        const buf = Buffer.alloc(Buffer.byteLength(value, "utf-8"));
        buf.write(value, "utf-8");
        this.bytes = Buffer.concat([this.bytes, buf]);
    }
    public writeChat(chat: Chat) {
        this.writeString(chat.toJSON());
    }
    public writeIdentifier() { }
    public writeVarInt(value: number) {
        do {
            let temp = (value & 0b01111111);
            value >>>= 7;
            if (value != 0) {
                temp |= 0b10000000;
            }
            this.writeUnsignedByte(temp);
        } while (value != 0);
    }
    public writeVarLong() { }
    public writeEntityMetadata() { }
    public writeSlot() { }
    public writeNBTTag() { }
    public writePosition() { }
    public writeAngle(value: number) {
        this.writeUnsignedByte(value);
    }
    public writeUUID(value: string) {
        const uuid = new Packet(Buffer.from(Buffer.from(value.split("").filter(value => value !== "-").join(""), "hex")));
        this.writeLong(uuid.readLong());
        this.writeLong(uuid.readLong());
    }
    public writeByteArray(length: number, bytes: number[]) {
        for (let index = 0; index < length; index++) {   
            this.writeByte(bytes[index]);
        }
    }
    public buildPacket(id: number): Buffer {
        const pkId = new Packet();
        pkId.writeVarInt(id);
        const pkLength = new Packet();
        pkLength.writeVarInt((pkId.bytes.byteLength + this.bytes.byteLength));
        const pk = Buffer.concat([pkLength.bytes, pkId.bytes])
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
    public decrypt() { }
    public encrypt() { }
    public addOffset(offset: number, retval: boolean = false) {
        if (retval) return (this.offset += offset);
        return (this.offset += offset) - offset;
    }
}