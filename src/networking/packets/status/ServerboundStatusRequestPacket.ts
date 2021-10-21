import type Packet from '../../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundStatusRequestPacket implements ServerboundPacket {
    public read(_data: Packet): this {
        return this;
    }
}
