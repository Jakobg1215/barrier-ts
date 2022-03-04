import type BlockPos from '../../../types/classes/BlockPos';
import type { Direction } from '../../../types/enums/Direction';
import type { InteractionHand } from '../../../types/enums/InteractionHand';
import Vector3 from '../../../utilities/Vector3';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundUseItemOnPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly blockPos: BlockPos;
    public readonly direction: Direction;
    public readonly location: Vector3;
    public readonly inside: boolean;
    public readonly hand: InteractionHand;

    public constructor(data: DataBuffer) {
        this.hand = data.readVarInt();
        this.blockPos = data.readBlockPos();
        this.direction = data.readVarInt();
        this.location = new Vector3(data.readFloat(), data.readFloat(), data.readFloat());
        this.inside = data.readBoolean();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleUseItemOn(this);
    }
}
