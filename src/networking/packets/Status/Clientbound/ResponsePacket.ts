import { StatusClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class ResponsePacket extends Packet {
    public static readonly id = StatusClientbound.Response;

    public JSONResponse!: string;

    public encrypt() {
        this.writeString(this.JSONResponse);
    }
}
