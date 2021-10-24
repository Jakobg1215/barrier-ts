import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundSetBeaconPacket implements ServerboundPacket {
    public primary!: number;
    public secondary!: number;

    public read(data: Packet): this {
        this.primary = data.readVarInt();
        this.secondary = data.readVarInt();
        return this;
    }
}
