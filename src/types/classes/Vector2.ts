export default class Vector2 {
    private xCoordinate: number;
    private yCoordinate: number;

    public constructor(x: number, y: number) {
        this.xCoordinate = x;
        this.yCoordinate = y;
    }

    public setCoordinates(newCords: this): this {
        this.xCoordinate = newCords.xCoordinate;
        this.yCoordinate = newCords.yCoordinate;
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

    public get x(): number {
        return this.xCoordinate;
    }

    public get y(): number {
        return this.yCoordinate;
    }

    public static zero(): Vector2 {
        return new this(0, 0);
    }
}
