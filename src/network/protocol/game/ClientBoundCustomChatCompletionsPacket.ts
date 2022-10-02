import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundCustomChatCompletionsPacket implements ClientBoundPacket {
    public constructor(public action: Action, public entries: string[]) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.action);
        packet.writeVarInt(this.entries.length);
        for (const entry of this.entries) {
            packet.writeString(entry);
        }
        return packet;
    }
}

export enum Action {
    ADD,
    REMOVE,
    SET,
}
