import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundTakeItemEntityPacket implements ClientBoundPacket {
    public constructor(public itemId: number, public playerId: number, public amount: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.itemId);
        packet.writeVarInt(this.playerId);
        packet.writeVarInt(this.amount);
        return packet;
    }
}
