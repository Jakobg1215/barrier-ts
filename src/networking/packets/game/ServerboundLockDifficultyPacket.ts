import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundLockDifficultyPacket implements ServerboundPacket {
    public locked!: boolean;

    public read(data: Packet): this {
        this.locked = data.readBoolean();
        return this;
    }
}
