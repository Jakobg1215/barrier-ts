import { FieldType } from '../../network/protocol/game/ClientBoundSetEntityDataPacket';
import { Pose } from '../../types/enums/Pose';
import Vector2 from '../../utilities/Vector2';
import Vector3 from '../../utilities/Vector3';
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
    protected pose = Pose.STANDING;

    public constructor() {
        this.synchedData.define(0, FieldType.BYTE, 0);
        this.synchedData.define(6, 18, Pose.STANDING);
    }

    public tick(): void {}

    private updateStatusData(): void {
        let status = 0;
        if (this.crouching) status |= 0x02;
        if (this.sprinting) status |= 0x08;
        this.synchedData.set(0, status);
    }

    private updatePose(pose: Pose): void {
        this.pose = pose;
        this.synchedData.set(6, pose);
    }

    public get isCrouching() {
        return this.crouching;
    }

    public set isCrouching(crouching: boolean) {
        this.crouching = crouching;
        crouching ? this.updatePose(Pose.CROUCHING) : this.updatePose(Pose.STANDING);
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

    public get pos() {
        return this.postion;
    }

    public get rot() {
        return this.rotation;
    }

    public get data() {
        return this.synchedData;
    }
}
