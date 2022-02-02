import type { InteractionHand } from '../../../types/enums/InteractionHand';
import Vector3 from '../../../utilitys/Vector3';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundInteractPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly entityId: number;
    public readonly action: ActionType;
    public readonly usingSecondaryAction: boolean;
    public readonly hand: InteractionHand | null = null;
    public readonly location: Vector3 | null = null;

    public constructor(data: DataBuffer) {
        this.entityId = data.readVarInt();
        this.action = data.readVarInt();
        switch (this.action) {
            case ActionType.INTERACT: {
                this.location = new Vector3(data.readFloat(), data.readFloat(), data.readFloat());
                this.hand = data.readVarInt();
                break;
            }

            case ActionType.INTERACT_AT: {
                this.hand = data.readVarInt();
                break;
            }
        }
        this.usingSecondaryAction = data.readBoolean();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleInteract(this);
    }
}

export enum ActionType {
    INTERACT,
    ATTACK,
    INTERACT_AT,
}
