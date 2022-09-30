import type { Buffer } from 'node:buffer';
import { TagIds } from '../types/enums/NbtTags';

export default class NbtReader {
    private bytes: Buffer;
    private offset = 0;

    private constructor(data: Buffer, private readonly sNBT: boolean) {
        this.bytes = data;
    }

    //#region TAGS

    private readTagByte(): string | number {
        if (this.sNBT) return this.bytes.readInt8(this.addOffset(1)).toString() + 'b';
        return this.bytes.readInt8(this.addOffset(1));
    }

    private readTagShort(): string | number {
        if (this.sNBT) return this.bytes.readInt16BE(this.addOffset(2)).toString() + 's';
        return this.bytes.readInt16BE(this.addOffset(2));
    }

    private readTagInt(): number {
        return this.bytes.readInt32BE(this.addOffset(4));
    }

    private readTagLong(): string | bigint {
        if (this.sNBT) return this.bytes.readBigInt64BE(this.addOffset(8)).toString() + 'l';
        return this.bytes.readBigInt64BE(this.addOffset(8));
    }

    private readTagFloat(): string | number {
        if (this.sNBT) return this.bytes.readFloatBE(this.addOffset(4)).toString() + 'f';
        return this.bytes.readFloatBE(this.addOffset(4));
    }

    private readTagDouble(): string | number {
        if (this.sNBT) return this.bytes.readDoubleBE(this.addOffset(8)).toString() + 'd';
        return this.bytes.readDoubleBE(this.addOffset(8));
    }

    private readTagByteArray(): number[] {
        const byteArrayLength: number = this.readSignedInteger();
        const bytes: number[] = [];
        for (let index = 0; index < byteArrayLength; index++) {
            bytes.push(this.readSignedByte());
        }
        return bytes;
    }

    private readTagString(): string {
        return this.bytes.toString('utf-8', this.offset + 2, this.addOffset(this.readUnsignedShort(), true));
    }

    private readTagList(): any[] {
        const list: any[] = [];

        const listType: number = this.readUnsignedByte();
        const listLength: number = this.readSignedInteger();

        switch (listType) {
            case TagIds.END: {
                for (let index = 0; index < listLength; index++) {
                    list.push(this.readUnsignedByte());
                }
                break;
            }

            case TagIds.BYTE: {
                for (let index = 0; index < listLength; index++) {
                    list.push(this.readTagByte());
                }
                break;
            }

            case TagIds.SHORT: {
                for (let index = 0; index < listLength; index++) {
                    list.push(this.readTagShort());
                }
                break;
            }

            case TagIds.INT: {
                for (let index = 0; index < listLength; index++) {
                    list.push(this.readTagInt());
                }
                break;
            }

            case TagIds.LONG: {
                for (let index = 0; index < listLength; index++) {
                    list.push(this.readTagLong());
                }
                break;
            }

            case TagIds.FLOAT: {
                for (let index = 0; index < listLength; index++) {
                    list.push(this.readTagFloat());
                }
                break;
            }

            case TagIds.DOUBLE: {
                for (let index = 0; index < listLength; index++) {
                    list.push(this.readTagDouble());
                }
                break;
            }

            case TagIds.BYTEARRAY: {
                for (let index = 0; index < listLength; index++) {
                    list.push(this.readTagByteArray());
                }
                break;
            }

            case TagIds.STRING: {
                for (let index = 0; index < listLength; index++) {
                    list.push(this.readTagString());
                }
                break;
            }

            case TagIds.LIST: {
                for (let index = 0; index < listLength; index++) {
                    list.push(this.readTagList());
                }
                break;
            }

            case TagIds.COMPOUND: {
                for (let index = 0; index < listLength; index++) {
                    list.push(this.readTagCompound());
                }
                break;
            }

            case TagIds.INTARRAY: {
                for (let index = 0; index < listLength; index++) {
                    list.push(this.readTagIntArray());
                }
                break;
            }

            case TagIds.LONGARRAY: {
                for (let index = 0; index < listLength; index++) {
                    list.push(this.readTagLongArray());
                }
                break;
            }

            default: {
                throw new RangeError('Invalid tag type!');
            }
        }

        return list;
    }

    private readTagCompound(): object {
        const compound: any = {};
        // eslint-disable-next-line no-constant-condition
        while (true) {
            switch (this.readUnsignedByte()) {
                case TagIds.END: {
                    return compound;
                }

                case TagIds.BYTE: {
                    compound[this.readString()] = this.readTagByte();
                    break;
                }

                case TagIds.SHORT: {
                    compound[this.readString()] = this.readTagShort();
                    break;
                }

                case TagIds.INT: {
                    compound[this.readString()] = this.readTagInt();
                    break;
                }

                case TagIds.LONG: {
                    compound[this.readString()] = this.readTagLong();
                    break;
                }

                case TagIds.FLOAT: {
                    compound[this.readString()] = this.readTagFloat();
                    break;
                }

                case TagIds.DOUBLE: {
                    compound[this.readString()] = this.readTagDouble();
                    break;
                }

                case TagIds.BYTEARRAY: {
                    compound[this.readString()] = this.readTagByteArray();
                    break;
                }

                case TagIds.STRING: {
                    compound[this.readString()] = this.readTagString();
                    break;
                }

                case TagIds.LIST: {
                    compound[this.readString()] = this.readTagList();
                    break;
                }

                case TagIds.COMPOUND: {
                    compound[this.readString()] = this.readTagCompound();
                    break;
                }

                case TagIds.INTARRAY: {
                    compound[this.readString()] = this.readTagIntArray();
                    break;
                }

                case TagIds.LONGARRAY: {
                    compound[this.readString()] = this.readTagLongArray();
                    break;
                }

                default: {
                    throw new RangeError('Invalid tag type!');
                }
            }
        }
    }

    private readTagIntArray(): number[] {
        const intArrayLength: number = this.readSignedInteger();
        const ints: number[] = [];
        for (let index = 0; index < intArrayLength; index++) {
            ints.push(this.readSignedInteger());
        }
        return ints;
    }

    private readTagLongArray(): bigint[] {
        const longArrayLength: number = this.readSignedInteger();
        const ints: bigint[] = [];
        for (let index = 0; index < longArrayLength; index++) {
            ints.push(this.readSignedLong());
        }
        return ints;
    }

    //#endregion

    //#region READERS

    private readSignedByte(): number {
        return this.bytes.readInt8(this.addOffset(1));
    }

    private readUnsignedByte(): number {
        return this.bytes.readUInt8(this.addOffset(1));
    }

    private readUnsignedShort(): number {
        return this.bytes.readUInt16BE(this.addOffset(2));
    }

    private readSignedInteger(): number {
        return this.bytes.readInt32BE(this.addOffset(4));
    }

    private readSignedLong(): bigint {
        return this.bytes.readBigInt64BE(this.addOffset(8));
    }

    private readString(): string {
        return this.bytes.toString('utf-8', this.offset + 2, this.addOffset(this.readUnsignedShort(), true));
    }

    //#endregion

    public static readData(data: Buffer, sNbt = true): [object, number] {
        const reader: NbtReader = new this(data, sNbt);
        if (reader.readUnsignedByte() === 0) return [{}, 1];
        reader.readUnsignedShort();
        return [reader.readTagCompound(), reader.offset];
    }

    public get buffer(): Buffer {
        return this.bytes;
    }

    private addOffset(offset: number, retval = false): number {
        return retval ? (this.offset += offset) : (this.offset += offset) - offset;
    }
}
