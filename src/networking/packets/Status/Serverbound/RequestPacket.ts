import Packet from '../../Packet';
import { StatusServerbound } from '../../../types/PacketIds';

export default class RequestPacket extends Packet {
    public static readonly id = StatusServerbound.Request;
}
