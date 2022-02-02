import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundMoveVehiclePacket implements ServerBoundPacket<GamePacketListener> {
    public readonly x: number;
    public readonly y: number;
    public readonly z: number;
    public readonly yRot: number;
    public readonly xRot: number;

    public constructor(data: DataBuffer) {
        this.x = data.readDouble();
        this.y = data.readDouble();
        this.z = data.readDouble();
        this.yRot = data.readFloat();
        this.xRot = data.readFloat();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleMoveVehicle(this);
    }
}
