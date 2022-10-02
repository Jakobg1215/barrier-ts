import type BlockPos from '../../../types/classes/BlockPos';
import type NameSpace from '../../../types/classes/NameSpace';
import type { GameType } from '../../../types/enums/GameType';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundRespawnPacket implements ClientBoundPacket {
    public constructor(
        public dimensionType: NameSpace,
        public dimension: NameSpace,
        public seed: bigint,
        public playerGameType: GameType,
        public previousPlayerGameType: GameType,
        public isDebug: boolean,
        public isFlat: boolean,
        public keepAllPlayerData: boolean,
        public lastDeathLocation: BlockPos | null,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeNameSpace(this.dimensionType);
        packet.writeNameSpace(this.dimension);
        packet.writeLong(this.seed);
        packet.writeUnsignedByte(this.playerGameType);
        packet.writeByte(this.previousPlayerGameType);
        packet.writeBoolean(this.isDebug);
        packet.writeBoolean(this.isFlat);
        packet.writeBoolean(this.keepAllPlayerData);
        packet.writeBoolean(this.lastDeathLocation !== null);
        if (this.lastDeathLocation) packet.writeBlockPos(this.lastDeathLocation);
        return packet;
    }
}
