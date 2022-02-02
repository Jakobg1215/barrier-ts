import type BarrierTs from '../BarrierTs';
import type Connection from './Connection';
import type PacketListener from './PacketListener';
import ClientBoundPongResponsePacket from './protocol/status/ClientBoundPongResponsePacket';
import ClientBoundStatusResponsePacket from './protocol/status/ClientBoundStatusResponsePacket';
import type ServerBoundPingRequestPacket from './protocol/status/ServerBoundPingRequestPacket';
import type ServerBoundStatusRequestPacket from './protocol/status/ServerBoundStatusRequestPacket';

export default class StatusPacketListener implements PacketListener {
    private hasRequestedStatus = false;

    public constructor(private readonly server: BarrierTs, private readonly connection: Connection) {}

    public handlePingRequest(pingRequest: ServerBoundPingRequestPacket): void {
        this.connection.send(new ClientBoundPongResponsePacket(pingRequest.time));
        this.connection.disconnect();
    }

    public handleStatusRequest(_statusRequest: ServerBoundStatusRequestPacket): void {
        if (this.hasRequestedStatus) this.connection.disconnect();
        else {
            this.hasRequestedStatus = true;
            this.connection.send(new ClientBoundStatusResponsePacket(this.server.getStatus()));
        }
    }
}
