import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';

export default class JoinGamePacket extends Packet {
    public static readonly id = PlayClientbound.JoinGame;

    public EntityID!: number;
    public Ishardcore!: boolean;
    public Gamemode!: number;
    public PreviousGamemode!: number;
    public WorldCount!: number;
    public WorldNames!: string[];
    public DimensionCodec!: Buffer;
    public WorldName!: string;
    public Hashedseed!: bigint;
    public MaxPlayers!: number;
    public ViewDistance!: number;
    public ReducedDebugInfo!: boolean;
    public Enablerespawnscreen!: boolean;
    public IsDebug!: boolean;
    public IsFlat!: boolean;

    public encrypt() {
        this.writeInt(this.EntityID);
        this.writeBoolean(this.Ishardcore);
        this.writeUnsignedByte(this.Gamemode);
        this.writeByte(this.PreviousGamemode);
        this.writeVarInt(this.WorldCount);
        for (let index = 0; index < this.WorldCount; index++) {
            this.writeString(this.WorldNames[index]);
        }
        this.append(this.DimensionCodec);
        this.writeString(this.WorldName);
        this.writeLong(this.Hashedseed);
        this.writeVarInt(this.MaxPlayers);
        this.writeVarInt(this.ViewDistance);
        this.writeBoolean(this.ReducedDebugInfo);
        this.writeBoolean(this.Enablerespawnscreen);
        this.writeBoolean(this.IsDebug);
        this.writeBoolean(this.IsFlat);
    }
}
