import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetTitlesAnimationPacket implements ClientboundPacket {
    public constructor(public fadeIn: number, public stay: number, public fadeOut: number) {}

    public write(): Packet {
        return new Packet().writeInt(this.fadeIn).writeInt(this.stay).writeInt(this.fadeOut);
    }
}
