import type Chat from '../../types/Chat';
import NBT from '../../types/NBT';
import Position from '../../types/Position';
import Slot from '../../types/Slot';

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
        let numRead = 0;
        let result = 0;
        let read;
        do {
            read = this.readUnsignedByte();
            let value = read & 0b01111111;
            result |= value << (7 * numRead);
            numRead++;
            if (numRead > 5) {
                throw new Error('VarInt is too big');
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
            let value = read & 0b01111111;
            result |= value << (7 * numRead);

            numRead++;
            if (numRead > 10) {
                throw new Error('VarLong is too big');
            }
        } while ((read & 0b10000000) != 0);

        return BigInt(result);
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
        const poz = this.bytes.slice(this.offset, this.addOffset(8, true));
        const xdata = poz.slice(0, 4).toJSON().data;
        let x: number[] | number = [];
        if (xdata[0] > 127) {
            x[0] = 255 - xdata[0];
            x[1] = 255 - xdata[1];
            x[2] = 255 - xdata[2];
            x[3] = Math.abs((xdata[3] - (xdata[3] & 63)) / 64 - 4);
            x = (x[0] * 4096 + x[1] * 1024 + x[2] * 256 + x[3] * 64) / 64;
            x = x - x * 2;
        } else {
            x = xdata[0] * 4096 + xdata[1] * 1024 + xdata[2] * 64 + (xdata[3] - (xdata[3] & 63)) / 64;
        }
        const zdata = poz.slice(3, 7).toJSON().data;
        let z: number[] | number = [];
        if (zdata[0] % 64 > 31) {
            z[0] = 63 - (zdata[0] % 64);
            z[1] = 255 - zdata[1];
            z[2] = 255 - zdata[2];
            z[3] = Math.abs(zdata[3] / 16 - 16);
            z = (z[0] * 65536 + z[1] * 4096 + z[2] * 256 + z[3] * 16) / 16;
            z = z - z * 2;
        } else {
            z = (zdata[0] % 64) * 1048576 + zdata[1] * 4096 + zdata[2] * 16 + zdata[3] / 16;
        }
        return new Position(x, poz.readUInt8(7), z);
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
            let temp = value & 0b01111111;
            value >>>= 7;
            if (value != 0) {
                temp |= 0b10000000;
            }
            this.writeUnsignedByte(temp);
        } while (value != 0);
    }
    public writeVarLong() {}
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
    public writePosition(position: Position) {
        let z: number[] = [0, 0, 0, 0];
        z[3] = Math.abs(position.getZ()) * 16;
        if (z[3] >= 256) {
            z[2] = Math.floor(z[3] / 256);
            z[3] = z[3] - z[2] * 256;
        }
        if (z[2] >= 256) {
            z[1] = Math.floor(z[2] / 256);
            z[2] = z[2] - z[1] * 256;
        }
        if (z[1] >= 256) {
            z[0] = Math.floor(z[1] / 256);
            z[1] = z[1] - z[0] * 256;
        }
        if (position.getZ() < 0) {
            z = [63 - z[0], 255 - z[1], 255 - z[2], 256 - z[3]];
        }
        let x: number[] = [0, 0, 0, 0];
        x[3] = Math.abs(position.getX()) * 64;
        if (x[3] >= 256) {
            x[2] = Math.floor(x[3] / 256);
            x[3] = x[3] - x[2] * 256;
        }
        if (x[2] >= 256) {
            x[1] = Math.floor(x[2] / 256);
            x[2] = x[2] - x[1] * 256;
        }
        if (x[1] >= 256) {
            x[0] = Math.floor(x[1] / 256);
            x[1] = x[1] - x[0] * 256;
        }
        if (position.getX() < 0) {
            x = [255 - x[0], 255 - x[1], 255 - x[2], 256 - x[3]];
        }
        x[3] = x[3] + z[0];
        const buf = Buffer.alloc(1);
        buf.writeUInt8(position.getY());
        this.append(Buffer.concat([Buffer.from(x), Buffer.from(z.slice(1)), buf]));
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
