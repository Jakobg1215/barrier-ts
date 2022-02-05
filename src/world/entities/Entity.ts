import { FieldType } from '../../network/protocol/game/ClientBoundSetEntityDataPacket';
import Vector2 from '../../utilitys/Vector2';
import Vector3 from '../../utilitys/Vector3';
import SynchedEntitiyData from './SynchedEntityData';

export default class Entity {
    private static idGenerator = 0;
    public readonly id = Entity.idGenerator++;
    protected readonly synchedData = new SynchedEntitiyData();
    protected postion = Vector3.ZERO;
    protected rotation = Vector2.ZERO;
    protected onGround = true;
    protected sprinting = false;
    protected crouching = false;

    public constructor() {
        this.synchedData.define(0, FieldType.BYTE, 0);
    }

    public tick(): void {}

    private updateStatusData(): void {
        let status = 0;
        if (this.crouching) status |= 0x02;
        if (this.sprinting) status |= 0x08;
        this.synchedData.set(0, status);
    }

    public get isCrouching() {
        return this.crouching;
    }

    public set isCrouching(crouching: boolean) {
        this.crouching = crouching;
        this.updateStatusData();
    }

    public get isSprinting() {
        return this.sprinting;
    }

    public set isSprinting(sprinting: boolean) {
        this.sprinting = sprinting;
        this.updateStatusData();
    }

    public get isOnGround() {
        return this.onGround;
    }

    public set isOnGround(onGround: boolean) {
        this.onGround = onGround;
    }

    public get pos() {
        return this.postion;
    }

    public get rot() {
        return this.rotation;
    }
}
