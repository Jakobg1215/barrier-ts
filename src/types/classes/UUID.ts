import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';

export default class UUID {
    public static get EMPTY() {
        return new this('00000000000000000000000000000000');
    }

    public static createFakeUUID(name: string): UUID {
        const data = createHash('md5').update(Buffer.from(name)).digest();
        data[6] = (data[6]! & 0x0f) | 0x30;
        data[8] = (data[6]! & 0x3f) | 0x80;
        return new this(data.toString('hex'));
    }
    private readonly data: string;

    public constructor(data: string) {
        this.data = data.replaceAll('-', '');
    }

    public toBuffer(): Buffer {
        return Buffer.from(this.data, 'hex');
    }

    public toString(): string {
        return this.data;
    }

    public toFormattedString(): string {
        return `${this.data.slice(0, 8)}-${this.data.slice(8, 12)}-${this.data.slice(12, 16)}-${this.data.slice(
            16,
            20,
        )}-${this.data.slice(20, 32)}`;
    }
}
