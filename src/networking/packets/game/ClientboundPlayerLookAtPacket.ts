import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundPlayerLookAtPacket implements ClientboundPacket {
    public constructor(
        public x: number,
        public y: number,
        public z: number,
        public entity: number,
        public fromAnchor: number,
        public toAnchor: number,
        public atEntity: boolean,
    ) {}

    public write(): Packet {
        const data: Packet = new Packet()
            .writeVarInt(this.fromAnchor)
            .writeDouble(this.x)
            .writeDouble(this.y)
            .writeDouble(this.z)
            .writeBoolean(this.atEntity);
        if (this.atEntity) {
            data.writeVarInt(this.entity).writeVarInt(this.toAnchor);
        }
        return data;
    }
}
