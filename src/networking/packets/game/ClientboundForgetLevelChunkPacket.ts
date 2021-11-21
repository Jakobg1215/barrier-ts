import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundForgetLevelChunkPacket implements ClientboundPacket {
    public constructor(public x: number, public z: number) {}

    public write(): Packet {
        return new Packet().writeInt(this.x).writeInt(this.z);
    }
}
