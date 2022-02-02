import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundUpdateAttributesPacket implements ClientBoundPacket {
    public constructor(public entityId: number, public attributes: any) {}

    public write(_packet: DataBuffer): DataBuffer {
        throw new Error('Method not implemented.'); // TODO: Implement data for ClientBoundUpdateAttributesPacket
    }
}
