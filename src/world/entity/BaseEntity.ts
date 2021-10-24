import Vector3 from '../../types/classes/Vector3';

export default class BaseEntity {
    private readonly entityPosition: Vector3 = Vector3.zero();
    private readonly entityid: number;

    public constructor(id: number) {
        this.entityid = id;
    }

    public updatePosition(pos: Vector3): this {
        this.entityPosition.setCoordinates(pos);
        return this;
    }

    public get position(): Vector3 {
        return this.entityPosition;
    }

    public get id(): number {
        return this.entityid;
    }
}
