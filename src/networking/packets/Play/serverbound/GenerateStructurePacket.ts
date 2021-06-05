import type Position from '../../../../types/Position';
import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class GenerateStructurePacket extends Packet {
    public static readonly id = PlayServerbound.GenerateStructure;

    public Location!: Position;
    public Levels!: number;
    public KeepJigsaws!: boolean;

    public decrypt() {
        this.Location = this.readPosition();
        this.Levels = this.readVarInt();
        this.KeepJigsaws = this.readBoolean();
    }
}
