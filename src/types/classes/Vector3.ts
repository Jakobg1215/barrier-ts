export default class Vector3 {
    private xCoordinate: number;
    private yCoordinate: number;
    private zCoordinate: number;

    public constructor(x: number, y: number, z: number) {
        this.xCoordinate = x;
        this.yCoordinate = y;
        this.zCoordinate = z;
    }

    public setCoordinates(newCords: this): this {
        this.xCoordinate = newCords.xCoordinate;
        this.yCoordinate = newCords.yCoordinate;
        this.zCoordinate = newCords.zCoordinate;
        return this;
    }

    public setX(newX: number): this {
        this.xCoordinate = newX;
        return this;
    }

    public setY(newY: number): this {
        this.yCoordinate = newY;
        return this;
    }

    public setZ(newZ: number): this {
        this.zCoordinate = newZ;
        return this;
    }

    public static zero(): Vector3 {
        return new this(0, 0, 0);
    }
}
