import type BlockPos from '../../../types/BlockPos';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundSignUpdatePacket implements ServerboundPacket {
    public pos!: BlockPos;
    public lines: string[] = [];

    public read(data: Packet): this {
        this.pos = data.readBlockPos();
        for (let index = 0; index < 4; index++) {
            this.lines.push(data.readString());
        }
        return this;
    }
}
