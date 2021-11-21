import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundTakeItemEntityPacket implements ClientboundPacket {
    public constructor(public itemId: number, public playerId: number, public amount: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.itemId).writeVarInt(this.playerId).writeVarInt(this.amount);
    }
}
