import Vector3 from '../../../types/classes/Vector3';
import type { InteractionHand } from '../../../types/enums/InteractionHand';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundInteractPacket implements ServerboundPacket {
    public entityId!: number;
    public action!: Action;
    public usingSecondaryAction!: boolean;
    public hand!: InteractionHand | null;
    public location!: Vector3 | null;

    public read(data: Packet): this {
        this.entityId = data.readVarInt();
        this.action = data.readVarInt();
        if (this.action === Action.INTERACT_AT) {
            this.location = new Vector3(data.readFloat(), data.readFloat(), data.readFloat());
            this.hand = data.readVarInt();
            this.usingSecondaryAction = data.readBoolean();
            return this;
        }
        if (this.action === Action.INTERACT) {
            this.location = null;
            this.hand = data.readVarInt();
            this.usingSecondaryAction = data.readBoolean();
            return this;
        }
        this.location = null;
        this.hand = null;
        this.usingSecondaryAction = data.readBoolean();
        return this;
    }
}

enum Action {
    INTERACT,
    ATTACK,
    INTERACT_AT,
}
