import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundSetBeaconPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly primary: number;
    public readonly secondary: number;

    public constructor(data: DataBuffer) {
        this.primary = data.readVarInt();
        this.secondary = data.readVarInt();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleSetBeacon(this);
    }
}
