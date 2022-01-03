import type { Hand } from '../../../types/enums/Hand';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundClientInformationPacket implements ServerboundPacket {
    public language!: string;
    public viewDistance!: number;
    public chatVisibility!: ChatVisiblity;
    public chatColors!: boolean;
    public modelCustomisation!: number;
    public mainHand!: Hand;
    public textFilteringEnabled!: boolean;
    public allowsListing!: boolean;

    public read(data: Packet): this {
        this.language = data.readString();
        this.viewDistance = data.readByte();
        this.chatVisibility = data.readVarInt();
        this.chatColors = data.readBoolean();
        this.modelCustomisation = data.readUnsignedByte();
        this.mainHand = data.readVarInt();
        this.textFilteringEnabled = data.readBoolean();
        this.allowsListing = data.readBoolean();
        return this;
    }
}

enum ChatVisiblity {
    FULL,
    SYSTEM,
    HIDDEN,
}
