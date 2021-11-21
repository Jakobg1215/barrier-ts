import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetCameraPacket implements ClientboundPacket {
    public constructor(public cameraId: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.cameraId);
    }
}
