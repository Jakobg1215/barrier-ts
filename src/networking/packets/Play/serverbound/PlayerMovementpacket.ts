import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class PlayerMovementPacket extends Packet {
    public static readonly id = PlayServerbound.PlayerMovement;

    public OnGround!: boolean;

    public decrypt() {
        this.OnGround = this.readBoolean();
    }
}
