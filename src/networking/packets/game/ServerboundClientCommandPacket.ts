import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundClientCommandPacket implements ServerboundPacket {
    public action!: Action;

    public read(data: Packet): this {
        this.action = data.readVarInt();
        return this;
    }
}

enum Action {
    PERFORM_RESPAWN,
    REQUEST_STATS,
}
