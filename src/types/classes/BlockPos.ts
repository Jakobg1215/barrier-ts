import Vector3 from './Vector3';

export default class BlockPos extends Vector3 {
    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y, z);
    }

    public toBigInt(): bigint {
        return BigInt(
            `0b${this.x.toString(2).padStart(26, '0').replaceAll('-', '').substr(0, 26)}${this.z
                .toString(2)
                .padStart(26, '0')
                .replaceAll('-', '')
                .substr(0, 26)}${this.y.toString(2).padStart(12, '0').replaceAll('-', '').substr(0, 12)}`,
        );
    }
}
