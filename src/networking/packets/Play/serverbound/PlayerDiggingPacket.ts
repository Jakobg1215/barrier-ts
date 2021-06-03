import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';
import type Position from '../../../../types/Position';

export default class PlayerDiggingPacket extends Packet {
    public static readonly id = PlayServerbound.PlayerDigging;

    public Status!: number;
    public Location!: Position;
    public Face!: number;

    public decrypt() {
        this.Status = this.readVarInt();
        this.Location = this.readPosition();
        this.Face = this.readByte();
    }
}
