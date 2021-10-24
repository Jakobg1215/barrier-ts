import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundPlayerAbilitiesPacket implements ServerboundPacket {
    public isFlying!: boolean;

    public read(data: Packet): this {
        const bitMask = data.readByte();
        this.isFlying = (bitMask & 2) !== 0;
        return this;
    }
}
