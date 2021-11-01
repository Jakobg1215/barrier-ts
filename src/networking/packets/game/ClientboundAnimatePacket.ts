import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundAnimatePacket implements ClientboundPacket {
    public readonly id: number = 6;
    public identifier: number;
    public action: number;

    public constructor(id: number, action: number) {
        this.identifier = id;
        this.action = action;
    }

    public write(): Packet {
        return new Packet();
    }
}
