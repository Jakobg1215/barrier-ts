import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetScorePacket implements ClientBoundPacket {
    public constructor(public owner: string, public objectiveName: string, public score: number, public method: Method) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeString(this.owner);
        packet.writeVarInt(this.method);
        packet.writeString(this.objectiveName);
        if (this.method === Method.REMOVE) return packet;
        packet.writeVarInt(this.score);
        return packet;
    }
}

export enum Method {
    CHANGE,
    REMOVE,
}
