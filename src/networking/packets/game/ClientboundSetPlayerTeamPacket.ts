import type ClientboundPacket from '../ClientbountPacket';
import type Packet from '../Packet';

export default class ClientboundSetPlayerTeamPacket implements ClientboundPacket {
    public constructor(public method: number, public name: string, public players: string[], public parameters: any) {}
    // TODO: Implement data for ClientboundSetPlayerTeamPacket
    public write(): Packet {
        throw new Error('Method not implemented.');
    }
}
