export default class Packet {
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
        return this.bytes.slice(this.offset, this.offset += this.readVarInt()).toString();
    }
    public readChat() { }
    public readIdentifier() {
        return this.readString();
    }
    public readVarInt() {
        let numRead = 0;
        let result = 0;
        let read;
        do {
            read = this.readByte();
            let value = (read & 0b01111111);
            result |= (value << (7 * numRead));
    
            numRead++;
            if (numRead > 5) {
                throw new Error("VarInt is too big");
            }
        } while ((read & 0b10000000) != 0);
    
        return result;
    }
    public readVarLong() { }
    public readEntityMetadata() { }
    public readNBTTag() { }
    public readPosition() { }
    public readAngle() { }
    public readUUID() { }
    public readOptionalX() { }
    public readArrayofX() { }
    public readXEnum() { }
    public readByteArray() { }
    private addOffset(offset: number) {
        return (this.offset += offset) - offset;
    }
}
