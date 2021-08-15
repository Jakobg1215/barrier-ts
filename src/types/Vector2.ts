export default class Vevtor2 {
    private x: number;
    private y: number;
    public constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    public getx() {
        return this.x;
    }
    public gety() {
        return this.y;
    }
    public setx(value: number) {
        this.x = value;
    }
    public sety(value: number) {
        this.y = value;
    }
}
