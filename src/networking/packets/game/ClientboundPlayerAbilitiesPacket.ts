import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundPlayerAbilitiesPacket implements ClientboundPacket {
    public readonly id: number = 50;
    public invulnerable: boolean;
    public isFlying: boolean;
    public canFly: boolean;
    public instabuild: boolean;
    public flyingSpeed: number;
    public walkingSpeed: number;

    public constructor(
        invulnerable: boolean,
        isFlying: boolean,
        canFly: boolean,
        instabuild: boolean,
        flyingSpeed: number,
        walkingSpeed: number,
    ) {
        this.invulnerable = invulnerable;
        this.isFlying = isFlying;
        this.canFly = canFly;
        this.instabuild = instabuild;
        this.flyingSpeed = flyingSpeed;
        this.walkingSpeed = walkingSpeed;
    }

    public write(): Packet {
        const data = new Packet();
        let bitMask = 0;
        if (this.invulnerable) bitMask |= 1;
        if (this.isFlying) bitMask |= 2;
        if (this.canFly) bitMask |= 4;
        if (this.instabuild) bitMask |= 8;
        data.writeByte(bitMask);
        data.writeFloat(this.flyingSpeed);
        data.writeFloat(this.walkingSpeed);
        return data;
    }
}
