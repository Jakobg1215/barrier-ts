import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundSetCommandMinecartPacket implements ServerboundPacket {
    public entity!: number;
    public command!: string;
    public trackOutput!: boolean;

    public read(data: Packet): this {
        this.entity = data.readVarInt();
        this.command = data.readString();
        this.trackOutput = data.readBoolean();
        return this;
    }
}
