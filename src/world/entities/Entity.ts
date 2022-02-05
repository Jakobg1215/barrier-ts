import Vector2 from '../../utilitys/Vector2';
import Vector3 from '../../utilitys/Vector3';

export default class Entity {
    private static idGenerator = 0;
    public readonly id = Entity.idGenerator++;
    protected postion = Vector3.ZERO;
    protected rotation = Vector2.ZERO;
    protected onGround = true;

    public tick(): void {}

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
