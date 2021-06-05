import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class PlayerRotationPacket extends Packet {
    public static readonly id = PlayServerbound.PlayerRotation;

    public Yaw!: number;
    public Pitch!: number;
    public OnGround!: boolean;

    public decrypt() {
        this.Yaw = this.readFloat();
        this.Pitch = this.readFloat();
        this.OnGround = this.readBoolean();
    }
}
