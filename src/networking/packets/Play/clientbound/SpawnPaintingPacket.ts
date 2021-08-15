import type Vector3 from '../../../../types/Vector3';
import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class SpawnPaintingPacket extends Packet {
    public static readonly id = PlayClientbound.SpawnPainting;

    public EntityID!: number;
    public EntityUUID!: string;
    public Motive!: number;
    public Location!: Vector3;
    public Direction!: number;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writeUUID(this.EntityUUID);
        this.writeVarInt(this.Motive);
        this.writePosition(this.Location);
        this.writeByte(this.Direction);
    }
}
