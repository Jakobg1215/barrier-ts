export default class Position {
    private x: number;
    private y: number;
    private z: number;
    public constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    public getX() {
        return this.x;
    }
    public getY() {
        return this.y;
    }
    public getZ() {
        return this.z;
    }
    public setX(value: number) {
        this.x = value;
    }
    public setY(value: number) {
        this.y = value;
    }
    public setZ(value: number) {
        this.z = value;
    }
}
