import type DataBuffer from '../../DataBuffer';
import type LoginPacketListener from '../../LoginPacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundCustomQueryPacket implements ServerBoundPacket<LoginPacketListener> {
    private static readonly MAX_PAYLOAD_SIZE = 1048576;
    public readonly transactionId: number;
    public readonly data: DataBuffer | null = null;

    public constructor(data: DataBuffer) {
        this.transactionId = data.readVarInt();
        if (data.readBoolean()) {
            if (data.getReadableBytes().buffer.length <= ServerBoundCustomQueryPacket.MAX_PAYLOAD_SIZE)
                throw new Error(`Payload may not be larger than ${ServerBoundCustomQueryPacket.MAX_PAYLOAD_SIZE} bytes`);

            this.data = data.getReadableBytes();
        }
    }

    public handle(handler: LoginPacketListener): void {
        handler.handleCustomQueryPacket(this);
    }
}
