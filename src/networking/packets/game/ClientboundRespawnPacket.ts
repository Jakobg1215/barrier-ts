import type { Buffer } from 'node:buffer';
import type { GameType } from '../../../types/enums/GameType';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundRespawnPacket implements ClientboundPacket {
    public constructor(
        public dimensionType: Buffer,
        public dimension: string,
        public seed: bigint,
        public playerGameType: GameType,
        public previousPlayerGameType: GameType,
        public isDebug: boolean,
        public isFlat: boolean,
        public keepAllPlayerData: boolean,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeNbt(this.dimensionType)
            .writeIdentifier(this.dimension)
            .writeLong(this.seed)
            .writeUnsignedByte(this.playerGameType)
            .writeByte(this.previousPlayerGameType)
            .writeBoolean(this.isDebug)
            .writeBoolean(this.isFlat)
            .writeBoolean(this.keepAllPlayerData);
    }
}
