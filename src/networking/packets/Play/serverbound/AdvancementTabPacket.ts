import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class AdvancementTabPacket extends Packet {
    public static readonly id = PlayServerbound.AdvancementTab;

    public Action!: number;
    public TabID!: string | undefined;

    public decrypt() {
        this.Action = this.readVarInt();
        if (this.Action === 0) {
            this.TabID = this.readIdentifier();
        }
    }
}
