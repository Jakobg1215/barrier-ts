import Vector3 from '../../utilitys/Vector3';

export default class BlockPos extends Vector3 {
    public static fromBuffer(value: bigint): BlockPos {
        const x = (Number(value >> 38n) << 6) >> 6;
        const y = (Number(value & 0xfffn) << 20) >> 20;
        const z = (Number((value >> 12n) & 0x3ffffffn) << 6) >> 6;
        return new BlockPos(x, y, z);
    }

    public toBigInt(): bigint {
        return BigInt(
            `0b${
                this.x < 0
                    ? new Uint32Array([this.x]).at(0)?.toString(2).slice(6)
                    : this.x.toString(2).padStart(26, '0')
            }${
                this.z < 0
                    ? new Uint32Array([this.z]).at(0)?.toString(2).slice(6)
                    : this.z.toString(2).padStart(26, '0')
            }${
                this.y < 0
                    ? new Uint16Array([this.y]).at(0)?.toString(2).slice(4)
                    : this.y.toString(2).padStart(12, '0')
            }`,
        );
    }
}
