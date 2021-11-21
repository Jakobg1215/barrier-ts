import type ClientboundPacket from '../ClientbountPacket';
import type Packet from '../Packet';

export default class ClientboundAwardStatsPacket implements ClientboundPacket {
    public constructor(public stats: any) {}
    // TODO: Implement data for ClientboundAwardStatsPacket
    public write(): Packet {
        throw new Error('Method not implemented.');
    }
}
