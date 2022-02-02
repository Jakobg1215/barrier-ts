import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';
export default class ClientBoundPlayerAbilitiesPacket implements ClientBoundPacket {
    private static readonly FLAG_INVULNERABLE = 1;
    private static readonly FLAG_FLYING = 2;
    private static readonly FLAG_CAN_FLY = 4;
    private static readonly FLAG_INSTABUILD = 8;

    public constructor(
        public invulnerable: boolean,
        public isFlying: boolean,
        public canFly: boolean,
        public instabuild: boolean,
        public flyingSpeed: number,
        public walkingSpeed: number,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        let bitMask = 0;
        if (this.invulnerable) bitMask |= ClientBoundPlayerAbilitiesPacket.FLAG_INVULNERABLE;
        if (this.isFlying) bitMask |= ClientBoundPlayerAbilitiesPacket.FLAG_FLYING;
        if (this.canFly) bitMask |= ClientBoundPlayerAbilitiesPacket.FLAG_CAN_FLY;
        if (this.instabuild) bitMask |= ClientBoundPlayerAbilitiesPacket.FLAG_INSTABUILD;
        packet.writeByte(bitMask);
        packet.writeFloat(this.flyingSpeed);
        packet.writeFloat(this.walkingSpeed);
        return packet;
    }
}
