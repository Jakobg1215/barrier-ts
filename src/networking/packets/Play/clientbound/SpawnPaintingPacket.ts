import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';
import type Position from '../../../../types/Position';

export default class SpawnPaintingPacket extends Packet {
    public static readonly id = PlayClientbound.SpawnPainting;

    public EntityID!: number;
    public EntityUUID!: string;
    public Motive!: number;
    public Location!: Position;
    public Direction!: number;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writeUUID(this.EntityUUID);
        this.writeVarInt(this.Motive);
        this.writePosition(this.Location);
        this.writeByte(this.Direction);
    }
}
