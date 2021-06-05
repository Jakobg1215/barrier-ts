import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class EntityActionPacket extends Packet {
    public static readonly id = PlayServerbound.EntityAction;

    public EntityID!: number;
    public ActionID!: number;
    public JumpBoost!: number;

    public decrypt() {
        this.EntityID = this.readVarInt();
        this.ActionID = this.readVarInt();
        this.JumpBoost = this.readVarInt();
    }
}
