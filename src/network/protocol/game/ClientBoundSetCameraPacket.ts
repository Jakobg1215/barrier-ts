import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetCameraPacket implements ClientBoundPacket {
    public constructor(public cameraId: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.cameraId);
        return packet;
    }
}
