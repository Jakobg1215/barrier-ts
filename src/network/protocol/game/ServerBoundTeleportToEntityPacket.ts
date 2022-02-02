import type UUID from '../../../types/classes/UUID';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundTeleportToEntityPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly uuid: UUID;

    public constructor(data: DataBuffer) {
        this.uuid = data.readUUID();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleTeleportToEntity(this);
    }
}
