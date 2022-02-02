import type StatusPacketListener from '../../StatusPacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundStatusRequestPacket implements ServerBoundPacket<StatusPacketListener> {
    public handle(handler: StatusPacketListener): void {
        handler.handleStatusRequest(this);
    }
}
