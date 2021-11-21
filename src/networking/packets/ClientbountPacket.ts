import type Packet from './Packet';

export default interface ClientboundPacket {
    write(): Packet;
}
