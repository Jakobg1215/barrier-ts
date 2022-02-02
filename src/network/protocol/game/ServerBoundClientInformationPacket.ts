import type { ChatVisiblity } from '../../../types/enums/ChatVisiblity';
import type { HumanoidArm } from '../../../types/enums/HumanoidArm';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundClientInformationPacket implements ServerBoundPacket<GamePacketListener> {
    private static readonly MAX_LANGUAGE_LENGTH = 16;
    public readonly language: string;
    public readonly viewDistance: number;
    public readonly chatVisibility: ChatVisiblity;
    public readonly chatColors: boolean;
    public readonly modelCustomisation: number;
    public readonly mainHand: HumanoidArm;
    public readonly textFilteringEnabled: boolean;
    public readonly allowsListing: boolean;

    public constructor(data: DataBuffer) {
        this.language = data.readString(ServerBoundClientInformationPacket.MAX_LANGUAGE_LENGTH);
        this.viewDistance = data.readByte();
        this.chatVisibility = data.readVarInt();
        this.chatColors = data.readBoolean();
        this.modelCustomisation = data.readByte();
        this.mainHand = data.readVarInt();
        this.textFilteringEnabled = data.readBoolean();
        this.allowsListing = data.readBoolean();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleClientInformation(this);
    }
}
