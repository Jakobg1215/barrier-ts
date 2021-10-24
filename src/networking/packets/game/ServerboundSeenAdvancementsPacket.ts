import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundSeenAdvancementsPacket implements ServerboundPacket {
    public action!: Action;
    public tag!: string | null;

    public read(data: Packet): this {
        this.action = data.readVarInt();
        if (this.action === Action.OPENED_TAB) {
            this.tag = data.readString();
            return this;
        }
        this.tag = null;
        return this;
    }
}

enum Action {
    OPENED_TAB,
    CLOSED_SCREEN,
}
