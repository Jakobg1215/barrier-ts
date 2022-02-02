import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundBossEventPacket implements ClientBoundPacket {
    public constructor(public id: string, public operation: Operation) {}

    public write(_packet: DataBuffer): DataBuffer {
        throw new Error('Method not implemented.'); // TODO: Implement data for ClientBoundBossEventPacket
    }
}

export enum Operation {
    ADD,
    REMOVE,
    UPDATE_PROGRESS,
    UPDATE_NAME,
    UPDATE_STYLE,
    UPDATE_PROPERTIES,
}
