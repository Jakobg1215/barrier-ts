import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundMoveEntityPacketPos implements ClientBoundPacket {
    public constructor(public entityId: number, public xa: number, public ya: number, public za: number, public onGround: boolean) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.entityId);
        packet.writeShort(Math.floor(this.xa * 4096));
        packet.writeShort(Math.floor(this.ya * 4096));
        packet.writeShort(Math.floor(this.za * 4096));
        packet.writeBoolean(this.onGround);
        return packet;
    }
}
