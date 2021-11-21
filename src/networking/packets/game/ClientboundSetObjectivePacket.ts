import type Chat from '../../../types/classes/Chat';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetObjectivePacket implements ClientboundPacket {
    public constructor(
        public objectiveName: string,
        public displayName: Chat,
        public renderType: RenderType,
        public method: number,
    ) {}

    public write(): Packet {
        const data: Packet = new Packet().writeString(this.objectiveName).writeByte(this.method);
        if (this.method === 1) {
            return data;
        }
        return data.writeChat(this.displayName).writeVarInt(this.renderType);
    }
}

export enum RenderType {
    INTEGER,
    HEARTS,
}
