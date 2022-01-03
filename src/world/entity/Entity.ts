import { randomUUID } from 'crypto';
import ClientboundSetEntityDataPacket from '../../networking/packets/game/ClientboundSetEntityDataPacket';
import type Chat from '../../types/classes/Chat';
import Vector2 from '../../types/classes/Vector2';
import Vector3 from '../../types/classes/Vector3';
import { Pose } from '../../types/enums/Pose';

export default class Entity {
    private static idGiver = 0;
    public readonly position = Vector3.zero;
    public readonly rotation = Vector2.zero;
    public readonly id;
    public readonly uuid;
    public onFire = false;
    public isCrouching = false;
    public isSprinting = false;
    public isSwimming = false;
    public isInvisible = false;
    public isGlowing = false;
    public isFlying = false;
    public air = 300;
    public name: Chat | null = null;
    public displayName = false;
    public isSilent = false;
    public noGravity = false;
    public pose = Pose.STANDING;
    public frozen = 0;

    public constructor() {
        this.id = Entity.idGiver++;
        this.uuid = randomUUID();
    }

    public updatePosition(pos: Vector3) {
        this.position.setCoordinates(pos);
    }

    public updateRotation(rot: Vector2) {
        this.rotation.setCoordinates(rot);
    }

    public updataMetaData(): ClientboundSetEntityDataPacket {
        let flags = 0;
        if (this.onFire) flags |= 0x01;
        if (this.isCrouching) flags |= 0x02;
        if (this.isSprinting) flags |= 0x08;
        if (this.isSwimming) flags |= 0x10;
        if (this.isInvisible) flags |= 0x20;
        if (this.isGlowing) flags |= 0x40;
        if (this.isFlying) flags |= 0x80;
        return new ClientboundSetEntityDataPacket(this.id, [
            { type: 0, index: 0, value: flags },
            { type: 1, index: 1, value: this.air },
            { type: 5, index: 2, value: this.name },
            { type: 7, index: 3, value: this.displayName },
            { type: 7, index: 4, value: this.isSilent },
            { type: 7, index: 5, value: this.noGravity },
            { type: 18, index: 6, value: this.pose },
            { type: 1, index: 7, value: this.frozen },
        ]);
    }
}
