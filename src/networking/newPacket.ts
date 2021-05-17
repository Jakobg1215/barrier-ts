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
    public readUnsignedByte() { }
    public readShort() { }
    public readUnsignedShort() { }
    public readInt() { }
    public readLong() { }
    public readFloat() { }
    public readDouble() { }
    public readString() { }
    public readChat() { }
    public readIdentifier() { }
    public readVarInt() { }
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
        return this.offset += offset;
    }
}

const buf = Buffer.alloc(3);
buf.writeInt8(20);
buf.writeInt8(43, 1);
buf.writeInt8(-71, 2);

const pk = new Packet(buf);
console.log(pk.readByte());
