import Vector3 from './Vector3';

export default class BlockPos extends Vector3 {
    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y, z);
    }
}
