import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetScorePacket implements ClientboundPacket {
    public constructor(
        public owner: string,
        public objectiveName: string,
        public score: number,
        public method: Method,
    ) {}

    public write(): Packet {
        const data: Packet = new Packet()
            .writeString(this.owner)
            .writeVarInt(this.method)
            .writeString(this.objectiveName);
        if (this.method === Method.REMOVE) return data;
        return data.writeVarInt(this.score);
    }
}

export enum Method {
    CHANGE,
    REMOVE,
}
