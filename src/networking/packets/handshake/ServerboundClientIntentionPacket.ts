import type { ProtocolState } from '../../Protocol';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ClientIntentionPacket implements ServerboundPacket {
    public protocolVersion!: number;
    public hostName!: string;
    public port!: number;
    public intention!: ProtocolState;

    public read(data: Packet): this {
        this.protocolVersion = data.readVarInt();
        this.hostName = data.readString();
        this.port = data.readUnsignedShort();
        this.intention = data.readVarInt();
        return this;
    }
}
