import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class SetBeaconEffectPacket extends Packet {
    public static readonly id = PlayServerbound.SetBeaconEffect;

    public PrimaryEffect!: number;
    public SecondaryEffect!: number;

    public decrypt() {
        this.PrimaryEffect = this.readVarInt();
        this.SecondaryEffect = this.readVarInt();
    }
}
