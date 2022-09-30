import type Chat from '../../../types/classes/Chat';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetObjectivePacket implements ClientBoundPacket {
    public constructor(public objectiveName: string, public displayName: Chat, public renderType: RenderType, public method: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeString(this.objectiveName);
        packet.writeByte(this.method);
        if (this.method === 1) {
            return packet;
        }
        packet.writeChat(this.displayName);
        packet.writeVarInt(this.renderType);
        return packet;
    }
}

export enum RenderType {
    INTEGER,
    HEARTS,
}
