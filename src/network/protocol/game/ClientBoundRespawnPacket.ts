import type { Buffer } from 'node:buffer';
import type NameSpace from '../../../types/classes/NameSpace';
import type { GameType } from '../../../types/enums/GameType';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundRespawnPacket implements ClientBoundPacket {
    public constructor(
        public dimensionType: Buffer,
        public dimension: NameSpace,
        public seed: bigint,
        public playerGameType: GameType,
        public previousPlayerGameType: GameType,
        public isDebug: boolean,
        public isFlat: boolean,
        public keepAllPlayerData: boolean,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeNbt(this.dimensionType);
        packet.writeNameSpace(this.dimension);
        packet.writeLong(this.seed);
        packet.writeUnsignedByte(this.playerGameType);
        packet.writeByte(this.previousPlayerGameType);
        packet.writeBoolean(this.isDebug);
        packet.writeBoolean(this.isFlat);
        packet.writeBoolean(this.keepAllPlayerData);
        return packet;
    }
}
