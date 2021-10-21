import type Packet from '../Packet';

export default interface ServerboundPacket {
    read(data: Packet): this;
}
