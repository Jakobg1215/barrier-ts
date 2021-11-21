import type ClientboundPacket from '../ClientbountPacket';
import type Packet from '../Packet';

export default class ClientboundUpdateAdvancementsPacket implements ClientboundPacket {
    public constructor(public reset: boolean, public added: any, public removed: any, public progress: any) {}
    // TODO: Implement data for ClientboundUpdateAdvancementsPacket
    public write(): Packet {
        throw new Error('Method not implemented.');
    }
}
