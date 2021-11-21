import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundStopSoundPacket implements ClientboundPacket {
    public constructor(public name: string | null, public source: number | null) {}

    public write(): Packet {
        const data: Packet = new Packet();
        if (this.source === null) {
            if (this.name === null) {
                return data.writeByte(0);
            }
            return data.writeByte(2).writeIdentifier(this.name);
        }
        if (this.name === null) {
            return data.writeByte(1).writeVarInt(this.source);
        }
        return data.writeByte(3).writeVarInt(this.source).writeIdentifier(this.name);
    }
}
