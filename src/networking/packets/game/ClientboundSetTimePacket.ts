import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetTimePacket implements ClientboundPacket {
    public constructor(public gameTime: bigint, public dayTime: bigint) {}

    public write(): Packet {
        return new Packet().writeLong(this.gameTime).writeLong(this.dayTime);
    }
}
