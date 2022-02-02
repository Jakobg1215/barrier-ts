import type DataBuffer from '../../DataBuffer';
import type StatusPacketListener from '../../StatusPacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundPingRequestPacket implements ServerBoundPacket<StatusPacketListener> {
    public readonly time: bigint;

    public constructor(data: DataBuffer) {
        this.time = data.readLong();
    }

    public handle(handler: StatusPacketListener): void {
        handler.handlePingRequest(this);
    }
}
