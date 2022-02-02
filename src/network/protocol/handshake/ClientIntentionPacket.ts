import type DataBuffer from '../../DataBuffer';
import type HandshakePacketListener from '../../HandshakePacketListener';
import type { ConnectionProtocol } from '../ConnectionProtocol';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ClientIntentionPacket implements ServerBoundPacket<HandshakePacketListener> {
    private static readonly MAX_HOST_LENGTH = 255;
    public readonly protocolVersion: number;
    public readonly hostName: string;
    public readonly port: number;
    public readonly intention: ConnectionProtocol;

    public constructor(data: DataBuffer) {
        this.protocolVersion = data.readVarInt();
        this.hostName = data.readString(ClientIntentionPacket.MAX_HOST_LENGTH);
        this.port = data.readUnsignedShort();
        this.intention = data.readVarInt();
    }

    public handle(handler: HandshakePacketListener): void {
        handler.handleIntention(this);
    }
}
