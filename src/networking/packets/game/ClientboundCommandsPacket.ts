import type ClientboundPacket from '../ClientbountPacket';
import type Packet from '../Packet';

export default class ClientboundCommandsPacket implements ClientboundPacket {
    public constructor(public root: any) {}
    // TODO: Implement data for ClientboundCommandsPacket
    public write(): Packet {
        throw new Error('Method not implemented.');
    }
}
