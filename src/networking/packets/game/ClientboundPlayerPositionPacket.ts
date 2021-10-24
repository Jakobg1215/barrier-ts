import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundPlayerPositionPacket implements ClientboundPacket {
    public readonly id: number = 56;
    public x: number;
    public y: number;
    public z: number;
    public yRot: number;
    public xRot: number;
    public relativeArguments: number;
    public identifier: number;
    public dismountVehicle: boolean;

    public constructor(
        x: number,
        y: number,
        z: number,
        yRot: number,
        xRot: number,
        relativeArguments: number,
        identifier: number,
        dismountVehicle: boolean,
    ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.yRot = yRot;
        this.xRot = xRot;
        this.relativeArguments = relativeArguments;
        this.identifier = identifier;
        this.dismountVehicle = dismountVehicle;
    }

    public write(): Packet {
        const data = new Packet();
        data.writeDouble(this.x);
        data.writeDouble(this.y);
        data.writeDouble(this.z);
        data.writeFloat(this.yRot);
        data.writeFloat(this.xRot);
        data.writeByte(this.relativeArguments);
        data.writeVarInt(this.id);
        data.writeBoolean(this.dismountVehicle);
        return data;
    }
}
