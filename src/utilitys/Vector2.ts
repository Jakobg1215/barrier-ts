export default class Vector2 {
    public static get ZERO() {
        return new this(0, 0);
    }
    private xCoordinate: number;
    private yCoordinate: number;

    public constructor(x: number, y: number) {
        this.xCoordinate = x;
        this.yCoordinate = y;
    }

    public get x(): number {
        return this.xCoordinate;
    }

    public get y(): number {
        return this.yCoordinate;
    }
}
