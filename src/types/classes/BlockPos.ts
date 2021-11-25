import type { Buffer } from 'buffer';
import Vector3 from './Vector3';

export default class BlockPos extends Vector3 {
    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y, z);
    }

    public static fromBuffer(value: Buffer): BlockPos {
        const bitval: string = value
            .toJSON()
            .data.map(byte => byte.toString(2).padStart(8, '0'))
            .join('');
        return new BlockPos(
            bitval.slice(0, 26).at(0) === '1'
                ? -(-parseInt(bitval.slice(0, 26), 2) & 0x1ffffff)
                : parseInt(bitval.slice(0, 26), 2),
            bitval.slice(52).at(0) === '1' ? -(-parseInt(bitval.slice(52), 2) & 0x7ff) : parseInt(bitval.slice(52), 2),
            bitval.slice(26, 52).at(0) === '1'
                ? -(-parseInt(bitval.slice(26, 52), 2) & 0x1ffffff)
                : parseInt(bitval.slice(26, 52), 2),
        );
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
