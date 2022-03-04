export default class Vector3 {
    public static get ZERO() {
        return new this(0, 0, 0);
    }
    private xCoordinate: number;
    private yCoordinate: number;
    private zCoordinate: number;

    public constructor(x: number, y: number, z: number) {
        this.xCoordinate = x;
        this.yCoordinate = y;
        this.zCoordinate = z;
    }

    public get x(): number {
        return this.xCoordinate;
    }

    public get y(): number {
        return this.yCoordinate;
    }

    public get z(): number {
        return this.zCoordinate;
    }
}
