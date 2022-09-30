import type NameSpace from '../../../types/classes/NameSpace';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundCustomPayloadPacket implements ServerBoundPacket<GamePacketListener> {
    private static readonly MAX_PAYLOAD_SIZE = 32767;
    public readonly identifier: NameSpace;
    public readonly data: DataBuffer;

    public constructor(data: DataBuffer) {
        this.identifier = data.readNameSpace();
        this.data = data.getReadableBytes();
        if (this.data.buffer.length >= ServerBoundCustomPayloadPacket.MAX_PAYLOAD_SIZE) throw new Error('Payload may not be larger than 32767 bytes');
    }

    public handle(handler: GamePacketListener): void {
        handler.handleCustomPayload(this);
    }
}
