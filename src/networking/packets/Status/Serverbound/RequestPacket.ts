import { StatusServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class RequestPacket extends Packet {
    public static readonly id = StatusServerbound.Request;
}
