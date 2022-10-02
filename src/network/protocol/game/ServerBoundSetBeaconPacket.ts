import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundSetBeaconPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly primary: number | null = null;
    public readonly secondary: number | null = null;

    public constructor(data: DataBuffer) {
        if (data.readBoolean()) this.primary = data.readVarInt();
        if (data.readBoolean()) this.secondary = data.readVarInt();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleSetBeacon(this);
    }
}
