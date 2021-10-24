import type Packet from './Packet';

export default interface ClientboundPacket {
    readonly id: number;
    write(): Packet;
}
