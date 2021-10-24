import type { Buffer } from 'node:buffer';
import type { GameType } from '../../../types/enums/GameType';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundLoginPacket implements ClientboundPacket {
    public readonly id: number = 38;
    public playerId: number;
    public seed: bigint;
    public hardcore: boolean;
    public gameType: GameType;
    public previousGameType: GameType;
    public levels: string[];
    public registryHolder: Buffer;
    public dimensionType: Buffer;
    public dimension: string;
    public maxPlayers: number;
    public chunkRadius: number;
    public reducedDebugInfo: boolean;
    public showDeathScreen: boolean;
    public isDebug: boolean;
    public isFlat: boolean;

    public constructor(
        playerId: number,
        seed: bigint,
        hardcore: boolean,
        gameType: GameType,
        previousGameType: GameType,
        levels: string[],
        registryHolder: Buffer,
        dimensionType: Buffer,
        dimension: string,
        maxPlayers: number,
        chunkRadius: number,
        reducedDebugInfo: boolean,
        showDeathScreen: boolean,
        isDebug: boolean,
        isFlat: boolean,
    ) {
        this.playerId = playerId;
        this.seed = seed;
        this.hardcore = hardcore;
        this.gameType = gameType;
        this.previousGameType = previousGameType;
        this.levels = levels;
        this.registryHolder = registryHolder;
        this.dimensionType = dimensionType;
        this.dimension = dimension;
        this.maxPlayers = maxPlayers;
        this.chunkRadius = chunkRadius;
        this.reducedDebugInfo = reducedDebugInfo;
        this.showDeathScreen = showDeathScreen;
        this.isDebug = isDebug;
        this.isFlat = isFlat;
    }

    public write(): Packet {
        const data = new Packet()
            .writeInt(this.playerId)
            .writeBoolean(this.hardcore)
            .writeByte(this.gameType)
            .writeByte(this.previousGameType)
            .writeVarInt(this.levels.length);
        this.levels.forEach((level: string): void => {
            data.writeString(level);
        });
        data.append(this.registryHolder)
            .append(this.dimensionType)
            .writeString(this.dimension)
            .writeLong(this.seed)
            .writeVarInt(this.maxPlayers)
            .writeVarInt(this.chunkRadius)
            .writeBoolean(this.reducedDebugInfo)
            .writeBoolean(this.showDeathScreen)
            .writeBoolean(this.isDebug)
            .writeBoolean(this.isFlat);
        return data;
    }
}
