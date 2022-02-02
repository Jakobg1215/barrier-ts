import type DataBuffer from '../DataBuffer';

export default interface ClientBoundPacket {
    write(packet: DataBuffer): DataBuffer;
}
