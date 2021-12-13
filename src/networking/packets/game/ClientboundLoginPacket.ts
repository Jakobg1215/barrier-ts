import type { Buffer } from 'node:buffer';
import type { GameType } from '../../../types/enums/GameType';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundLoginPacket implements ClientboundPacket {
    public constructor(
        public playerId: number,
        public seed: bigint,
        public hardcore: boolean,
        public gameType: GameType,
        public previousGameType: GameType,
        public levels: string[],
        public registryHolder: Buffer,
        public dimensionType: Buffer,
        public dimension: string,
        public maxPlayers: number,
        public chunkRadius: number,
        public simulationRadius: number,
        public reducedDebugInfo: boolean,
        public showDeathScreen: boolean,
        public isDebug: boolean,
        public isFlat: boolean,
    ) {}

    public write(): Packet {
        const data: Packet = new Packet()
            .writeInt(this.playerId)
            .writeBoolean(this.hardcore)
            .writeByte(this.gameType)
            .writeByte(this.previousGameType)
            .writeVarInt(this.levels.length);
        this.levels.forEach((level: string): void => {
            data.writeIdentifier(level);
        });
        data.append(this.registryHolder)
            .append(this.dimensionType)
            .writeIdentifier(this.dimension)
            .writeLong(this.seed)
            .writeVarInt(this.maxPlayers)
            .writeVarInt(this.chunkRadius)
            .writeVarInt(this.simulationRadius)
            .writeBoolean(this.reducedDebugInfo)
            .writeBoolean(this.showDeathScreen)
            .writeBoolean(this.isDebug)
            .writeBoolean(this.isFlat);
        return data;
    }
}
