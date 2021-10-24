import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundEditBookPacket implements ServerboundPacket {
    public slot!: number;
    public pages: string[] = [];
    public title!: string | null;

    public read(data: Packet): this {
        this.slot = data.readVarInt();
        for (let index = 0; index < data.readVarInt(); index++) {
            this.pages.push(data.readString());
        }
        if (data.readBoolean()) {
            this.title = data.readString();
            return this;
        }
        this.title = null;
        return this;
    }
}
