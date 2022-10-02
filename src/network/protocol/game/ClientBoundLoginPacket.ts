import type { Buffer } from 'node:buffer';
import type BlockPos from '../../../types/classes/BlockPos';
import type NameSpace from '../../../types/classes/NameSpace';
import type { GameType } from '../../../types/enums/GameType';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundLoginPacket implements ClientBoundPacket {
    public constructor(
        public playerId: number,
        public hardcore: boolean,
        public gameType: GameType,
        public previousGameType: GameType,
        public levels: NameSpace[],
        public registryHolder: Buffer,
        public dimensionType: NameSpace,
        public dimension: NameSpace,
        public seed: bigint,
        public maxPlayers: number,
        public chunkRadius: number,
        public simulationDistance: number,
        public reducedDebugInfo: boolean,
        public showDeathScreen: boolean,
        public isDebug: boolean,
        public isFlat: boolean,
        public lastDeathLocation: BlockPos | null,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeInt(this.playerId);
        packet.writeBoolean(this.hardcore);
        packet.writeByte(this.gameType);
        packet.writeByte(this.previousGameType);
        packet.writeVarInt(this.levels.length);
        this.levels.forEach((level): void => {
            packet.writeNameSpace(level);
        });
        packet.append(this.registryHolder);
        packet.writeNameSpace(this.dimensionType);
        packet.writeNameSpace(this.dimension);
        packet.writeLong(this.seed);
        packet.writeVarInt(this.maxPlayers);
        packet.writeVarInt(this.chunkRadius);
        packet.writeVarInt(this.simulationDistance);
        packet.writeBoolean(this.reducedDebugInfo);
        packet.writeBoolean(this.showDeathScreen);
        packet.writeBoolean(this.isDebug);
        packet.writeBoolean(this.isFlat);
        if (!this.lastDeathLocation) {
            packet.writeBoolean(false);
            return packet;
        }
        packet.writeBoolean(true);
        packet.writeBlockPos(this.lastDeathLocation);
        return packet;
    }
}
