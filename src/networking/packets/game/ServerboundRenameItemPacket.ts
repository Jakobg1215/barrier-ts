import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundRenameItemPacket implements ServerboundPacket {
    public name!: string;

    public read(data: Packet): this {
        this.name = data.readString();
        return this;
    }
}
