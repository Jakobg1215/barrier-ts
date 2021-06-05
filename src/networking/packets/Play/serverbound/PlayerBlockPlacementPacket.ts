import type Position from '../../../../types/Position';
import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class PlayerBlockPlacementPacket extends Packet {
    public static readonly id = PlayServerbound.PlayerBlockPlacement;

    public Hand!: number;
    public Location!: Position;
    public Face!: number;
    public CursorPositionX!: number;
    public CursorPositionY!: number;
    public CursorPositionZ!: number;
    public Insideblock!: boolean;

    public decrypt() {
        this.Hand = this.readVarInt();
        this.Location = this.readPosition();
        this.Face = this.readVarInt();
        this.CursorPositionX = this.readFloat();
        this.CursorPositionY = this.readFloat();
        this.CursorPositionZ = this.readFloat();
        this.Insideblock = this.readBoolean();
    }
}
