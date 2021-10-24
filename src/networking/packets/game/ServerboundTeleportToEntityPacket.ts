import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundTeleportToEntityPacket implements ServerboundPacket {
    public uuid!: string;

    public read(data: Packet): this {
        this.uuid = data.readUUID();
        return this;
    }
}
