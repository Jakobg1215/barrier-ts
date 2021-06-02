import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';

export default class InteractEntityPacket extends Packet {
    public static readonly id = PlayServerbound.InteractEntity;

    public EntityID!: number;
    public Type!: number;
    public TargetX!: number | undefined;
    public TargetY!: number | undefined;
    public TargetZ!: number | undefined;
    public Hand!: number | undefined;
    public Sneaking!: boolean;

    public decrypt() {
        this.EntityID = this.readVarInt();
        this.Type = this.readVarInt();
        if (this.Type === 2) {
            this.TargetX = this.readFloat();
            this.TargetY = this.readFloat();
            this.TargetZ = this.readFloat();
        }
        if (this.Type !== 1) {
            this.Hand = this.readVarInt();
        }
    }
}
