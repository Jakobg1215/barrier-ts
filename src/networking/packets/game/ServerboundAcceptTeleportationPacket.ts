import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundAcceptTeleportationPacket implements ServerboundPacket {
    public id!: number;

    public read(data: Packet): this {
        this.id = data.readVarInt();
        return this;
    }
}
