import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundPlayerAbilitiesPacket implements ServerBoundPacket<GamePacketListener> {
    private static readonly FLAG_FLYING = 2;
    public readonly isFlying: boolean;

    public constructor(data: DataBuffer) {
        const bitMask = data.readByte();
        this.isFlying = !!(bitMask & ServerBoundPlayerAbilitiesPacket.FLAG_FLYING);
    }

    public handle(handler: GamePacketListener): void {
        handler.handlePlayerAbilities(this);
    }
}
