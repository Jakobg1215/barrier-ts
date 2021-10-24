import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundResourcePackPacket implements ServerboundPacket {
    public action!: Action;

    public read(data: Packet): this {
        this.action = data.readVarInt();
        return this;
    }
}

enum Action {
    SUCCESSFULLY_LOADED,
    DECLINED,
    FAILED_DOWNLOAD,
    ACCEPTED,
}
