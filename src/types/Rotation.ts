export default class Rotation {
    private yaw: number;
    private pitch: number;
    public constructor(yaw = 0, pitch = 0) {
        this.yaw = yaw;
        this.pitch = pitch;
    }
    public getYaw() {
        return this.yaw;
    }
    public getPitch() {
        return this.pitch;
    }
    public setYaw(value: number) {
        this.yaw = value;
    }
    public setPitch(value: number) {
        this.pitch = value;
    }
}
