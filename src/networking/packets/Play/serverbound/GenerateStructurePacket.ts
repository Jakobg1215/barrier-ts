import type Vector3 from '../../../../types/Vector3';
import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class GenerateStructurePacket extends Packet {
    public static readonly id = PlayServerbound.GenerateStructure;

    public Location!: Vector3;
    public Levels!: number;
    public KeepJigsaws!: boolean;

    public decrypt() {
        this.Location = this.readPosition();
        this.Levels = this.readVarInt();
        this.KeepJigsaws = this.readBoolean();
    }
}
