import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundClientInformationPacket implements ServerboundPacket {
    public language!: string;
    public viewDistance!: number;
    public chatVisibility!: ChatVisiblity;
    public chatColors!: boolean;
    public modelCustomisation!: number;
    public mainHand!: HumanoidArm;
    public textFilteringEnabled!: boolean;

    public read(data: Packet): this {
        this.language = data.readString();
        this.viewDistance = data.readByte();
        this.chatVisibility = data.readVarInt();
        this.chatColors = data.readBoolean();
        this.modelCustomisation = data.readUnsignedByte();
        this.mainHand = data.readVarInt();
        this.textFilteringEnabled = data.readBoolean();
        return this;
    }
}

enum ChatVisiblity {
    FULL,
    SYSTEM,
    HIDDEN,
}

enum HumanoidArm {
    LEFT,
    RIGHT,
}
