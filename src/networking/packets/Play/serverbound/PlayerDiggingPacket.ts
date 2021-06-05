import type Position from '../../../../types/Position';
import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

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
