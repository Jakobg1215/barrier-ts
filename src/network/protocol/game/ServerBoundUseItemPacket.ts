import type { InteractionHand } from '../../../types/enums/InteractionHand';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundUseItemPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly hand: InteractionHand;
    public readonly sequence: number;

    public constructor(data: DataBuffer) {
        this.hand = data.readVarInt();
        this.sequence = data.readVarInt();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleUseItem(this);
    }
}
