import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundCommandSuggestionPacket implements ServerboundPacket {
    public id!: number;
    public command!: string;

    public read(data: Packet): this {
        this.id = data.readVarInt();
        this.command = data.readString();
        return this;
    }
}
