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

    public get x(): number {
        return this.xCoordinate;
    }

    public get y(): number {
        return this.yCoordinate;
    }

    public get z(): number {
        return this.zCoordinate;
    }

    public toString(): string {
        return `(${this.xCoordinate}, ${this.yCoordinate}, ${this.zCoordinate})`;
    }

    public static get zero(): Vector3 {
        return new this(0, 0, 0);
    }

    public static distance(to: Vector3, from: Vector3): number {
        return Math.sqrt(
            (from.xCoordinate - to.xCoordinate) ** 2 +
                (from.yCoordinate - to.yCoordinate) ** 2 +
                (from.zCoordinate - to.zCoordinate) ** 2,
        );
    }

    public static angle(to: Vector3, from: Vector3): Vector3 {
        const d0 = to.xCoordinate - from.xCoordinate;
        const d1 = to.yCoordinate - from.yCoordinate;
        const d2 = to.zCoordinate - from.zCoordinate;
        const d3 = Math.sqrt(d0 * d0 + d2 * d2);

        return new this(
            (Math.atan2(d2, d0) * (180 / Math.PI) - 90.0) % 360,
            -(Math.atan2(d1, d3) * (180 / Math.PI)) % 360,
            0, // There is no reason to calculate the roll
        );
    }
}
