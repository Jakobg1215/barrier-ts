import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';
import type Position from '../../../../types/Position';

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
