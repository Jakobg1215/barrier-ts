import type DataBuffer from '../../DataBuffer';
import type LoginPacketListener from '../../LoginPacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundCustomQueryPacket implements ServerBoundPacket<LoginPacketListener> {
    private static readonly MAX_PAYLOAD_SIZE = 1048576;
    public readonly transactionId: number;
    public readonly data: DataBuffer | null;

    public constructor(data: DataBuffer) {
        this.transactionId = data.readVarInt();
        if (data.readBoolean()) {
            const leftOvers = data.getReadableBytes().buffer.length;

            if (leftOvers < 0 || leftOvers > ServerBoundCustomQueryPacket.MAX_PAYLOAD_SIZE) {
                throw new Error('Payload is an incorrect size!');
            }

            this.data = data.getReadableBytes();
        } else this.data = null;
    }

    public handle(handler: LoginPacketListener): void {
        handler.handleCustomQueryPacket(this);
    }
}
