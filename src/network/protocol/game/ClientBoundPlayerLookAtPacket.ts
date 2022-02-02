import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundPlayerLookAtPacket implements ClientBoundPacket {
    public constructor(
        public x: number,
        public y: number,
        public z: number,
        public entity: number,
        public fromAnchor: number,
        public toAnchor: number,
        public atEntity: boolean,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.fromAnchor);
        packet.writeDouble(this.x);
        packet.writeDouble(this.y);
        packet.writeDouble(this.z);
        packet.writeBoolean(this.atEntity);
        if (this.atEntity) {
            packet.writeVarInt(this.entity);
            packet.writeVarInt(this.toAnchor);
        }
        return packet;
    }
}
