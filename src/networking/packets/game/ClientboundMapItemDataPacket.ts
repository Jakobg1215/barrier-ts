import type ClientboundPacket from '../ClientbountPacket';
import type Packet from '../Packet';

export default class ClientboundMapItemDataPacket implements ClientboundPacket {
    public constructor(
        public mapId: number,
        public scale: number,
        public locked: boolean,
        public decorations: any,
        public colorPatch: any,
    ) {}
    // TODO: Implement data for ClientboundMapItemDataPacket
    public write(): Packet {
        throw new Error('Method not implemented.');
    }
}
