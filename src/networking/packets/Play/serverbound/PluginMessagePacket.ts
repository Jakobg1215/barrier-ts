import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class PluginMessagePacket extends Packet {
    public static readonly id = PlayServerbound.PluginMessage;

    public Channel!: string;
    public Data!: number[];

    public decrypt() {
        this.Channel = this.readIdentifier();
        for (let index = 0; index < this.getBytes().slice(this.getOffset()).length; index++) {
            this.Data.push(this.readByte());
        }
    }
}