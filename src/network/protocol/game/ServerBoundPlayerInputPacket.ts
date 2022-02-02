import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundPlayerInputPacket implements ServerBoundPacket<GamePacketListener> {
    private static readonly FLAG_JUMPING = 1;
    private static readonly FLAG_SHIFT_KEY_DOWN = 2;
    public readonly xxa: number;
    public readonly zza: number;
    public readonly isJumping: boolean;
    public readonly isShiftKeyDown: boolean;

    public constructor(data: DataBuffer) {
        this.xxa = data.readFloat();
        this.zza = data.readFloat();
        const bitMask = data.readByte();
        this.isJumping = !!(bitMask & ServerBoundPlayerInputPacket.FLAG_JUMPING);
        this.isShiftKeyDown = !!(bitMask & ServerBoundPlayerInputPacket.FLAG_SHIFT_KEY_DOWN);
    }

    public handle(handler: GamePacketListener): void {
        handler.handlePlayerInput(this);
    }
}
