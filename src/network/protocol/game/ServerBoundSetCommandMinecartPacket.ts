import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundSetCommandMinecartPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly entity: number;
    public readonly command: string;
    public readonly trackOutput: boolean;

    public constructor(data: DataBuffer) {
        this.entity = data.readVarInt();
        this.command = data.readString();
        this.trackOutput = data.readBoolean();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleSetCommandMinecart(this);
    }
}
