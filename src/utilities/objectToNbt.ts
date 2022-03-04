import type { Buffer } from 'node:buffer';
import { TagIds } from '../types/enums/NbtTags';
import NbtWriter from './NbtWriter';

export default function objectToNbt(data: object): Buffer {
    const elements: [string, any][] = Object.entries(data);
    const nbtData: NbtWriter = new NbtWriter();

    nbtData.writeTagCompound();

    function writeList(data: any[], name?: string | null): void {
        switch (typeof data[0]) {
            case 'bigint': {
                nbtData.writeTagList(TagIds.LONG, data.length, name);
                data.forEach((long: bigint): void => void nbtData.writeTagLong(long, null));
                break;
            }

            case 'boolean': {
                nbtData.writeTagList(TagIds.BYTE, data.length, name);
                data.forEach((bool: boolean): void => void nbtData.writeTagByte(bool ? 1 : 0, null));
                break;
            }

            case 'number': {
                if (!Number.isInteger(data[0])) {
                    nbtData.writeTagList(TagIds.FLOAT, data.length, name);
                    data.forEach((float: number): void => void nbtData.writeTagFloat(float, null));
                    break;
                }

                nbtData.writeTagList(TagIds.INT, data.length, name);
                data.forEach((int: number): void => void nbtData.writeTagInt(int, null));
                break;
            }

            case 'object': {
                if (Array.isArray(data[0])) {
                    nbtData.writeTagList(TagIds.LIST, data.length, name);
                    data.forEach((list: any[]): void => void writeList(list, null));
                }

                if (data[0] === null) {
                    nbtData.writeTagList(TagIds.END, 0, name);
                    nbtData.writeTagEnd();
                    break;
                }

                nbtData.writeTagList(TagIds.COMPOUND, data.length, name);
                data.forEach((comp: object): void => void writeCompound(Object.entries(comp)));
                break;
            }

            case 'string': {
                if (data[0].slice(-1).match(/[bslfd]/)) {
                    if (data[0].slice(0, -1).match(/^[0-9.-]*$/)) {
                        switch (data[0].slice(-1)) {
                            case 'b': {
                                nbtData.writeTagList(TagIds.BYTE, data.length, name);
                                data.forEach((byte: number): void => void nbtData.writeTagByte(byte, null));
                                break;
                            }

                            case 's': {
                                nbtData.writeTagList(TagIds.SHORT, data.length, name);
                                data.forEach((short: number): void => void nbtData.writeTagShort(short, null));
                                break;
                            }

                            case 'l': {
                                nbtData.writeTagList(TagIds.LONG, data.length, name);
                                data.forEach((long: bigint): void => void nbtData.writeTagLong(long, null));
                                break;
                            }

                            case 'f': {
                                nbtData.writeTagList(TagIds.FLOAT, data.length, name);
                                data.forEach((float: number): void => void nbtData.writeTagFloat(float, null));
                                break;
                            }

                            case 'd': {
                                nbtData.writeTagList(TagIds.DOUBLE, data.length, name);
                                data.forEach((double: number): void => void nbtData.writeTagDouble(double, null));
                                break;
                            }
                        }
                        break;
                    }
                }

                if (data[0] === ':BA:') {
                    nbtData.writeTagByteArray(data.slice(1), null);
                    break;
                }

                if (data[0] === ':IA:') {
                    nbtData.writeTagIntArray(data.slice(1), null);
                    break;
                }

                if (data[0] === ':LA:') {
                    nbtData.writeTagLongArray(data.slice(1), null);
                    break;
                }

                nbtData.writeTagList(TagIds.STRING, data.length, name);
                data.forEach((string: string): void => void nbtData.writeTagString(string, null));
                break;
            }

            default: {
                nbtData.writeTagList(TagIds.END, 0, name);
                nbtData.writeTagEnd();
            }
        }
    }

    function writeCompound(data: [string, any][]): void {
        data.forEach(([elementName, elementData]: [string, any]) => {
            switch (typeof elementData) {
                case 'bigint': {
                    nbtData.writeTagLong(elementData, elementName);
                    break;
                }

                case 'boolean': {
                    nbtData.writeTagByte(elementData ? 1 : 0, elementName);
                    break;
                }

                case 'number': {
                    if (!Number.isInteger(elementData)) {
                        nbtData.writeTagFloat(elementData, elementName);
                        break;
                    }
                    nbtData.writeTagInt(elementData, elementName);
                    break;
                }

                case 'object': {
                    if (Array.isArray(elementData)) {
                        if (elementData[0] === ':BA:') {
                            nbtData.writeTagByteArray(elementData.slice(1), elementName);
                            break;
                        }

                        if (elementData[0] === ':IA:') {
                            nbtData.writeTagIntArray(elementData.slice(1), elementName);
                            break;
                        }

                        if (elementData[0] === ':LA:') {
                            nbtData.writeTagLongArray(elementData.slice(1), elementName);
                            break;
                        }

                        writeList(elementData, elementName);
                        break;
                    }

                    if (elementData === null) {
                        nbtData.writeTagInt(0, elementName);
                        break;
                    }

                    nbtData.writeTagCompound(elementName);
                    writeCompound(Object.entries(elementData));
                    break;
                }

                case 'string': {
                    if (elementData.slice(-1).match(/[bslfd]/)) {
                        if (elementData.slice(0, -1).match(/^[0-9.-]*$/)) {
                            switch (elementData.slice(-1)) {
                                case 'b': {
                                    nbtData.writeTagByte(parseInt(elementData.slice(0, -1)), elementName);
                                    break;
                                }

                                case 's': {
                                    nbtData.writeTagShort(parseInt(elementData.slice(0, -1)), elementName);
                                    break;
                                }

                                case 'l': {
                                    nbtData.writeTagLong(BigInt(elementData.slice(0, -1)), elementName);
                                    break;
                                }

                                case 'f': {
                                    nbtData.writeTagFloat(parseFloat(elementData.slice(0, -1)), elementName);
                                    break;
                                }

                                case 'd': {
                                    nbtData.writeTagDouble(parseFloat(elementData.slice(0, -1)), elementName);
                                    break;
                                }
                            }
                            break;
                        }
                    }

                    nbtData.writeTagString(elementData, elementName);
                    break;
                }

                default: {
                    nbtData.writeTagInt(0, elementName);
                    break;
                }
            }
        });

        nbtData.writeTagEnd();
    }

    elements.forEach(([elementName, elementData]: [string, any]) => {
        switch (typeof elementData) {
            case 'bigint': {
                nbtData.writeTagLong(elementData, elementName);
                break;
            }

            case 'boolean': {
                nbtData.writeTagByte(elementData ? 1 : 0, elementName);
                break;
            }

            case 'number': {
                if (!Number.isInteger(elementData)) {
                    nbtData.writeTagFloat(elementData, elementName);
                    break;
                }
                nbtData.writeTagInt(elementData, elementName);
                break;
            }

            case 'object': {
                if (Array.isArray(elementData)) {
                    if (elementData[0] === ':BA:') {
                        nbtData.writeTagByteArray(elementData.slice(1), elementName);
                        break;
                    }

                    if (elementData[0] === ':IA:') {
                        nbtData.writeTagIntArray(elementData.slice(1), elementName);
                        break;
                    }

                    if (elementData[0] === ':LA:') {
                        nbtData.writeTagLongArray(elementData.slice(1), elementName);
                        break;
                    }

                    writeList(elementData, elementName);
                    break;
                }

                if (elementData === null) {
                    nbtData.writeTagInt(0, elementName);
                    break;
                }

                nbtData.writeTagCompound(elementName);
                writeCompound(Object.entries(elementData));
                break;
            }

            case 'string': {
                if (elementData.slice(-1).match(/[bslfd]/)) {
                    if (elementData.slice(0, -1).match(/^[0-9.-]*$/)) {
                        switch (elementData.slice(-1)) {
                            case 'b': {
                                nbtData.writeTagByte(parseInt(elementData.slice(0, -1)), elementName);
                                break;
                            }

                            case 's': {
                                nbtData.writeTagShort(parseInt(elementData.slice(0, -1)), elementName);
                                break;
                            }

                            case 'l': {
                                nbtData.writeTagLong(BigInt(elementData.slice(0, -1)), elementName);
                                break;
                            }

                            case 'f': {
                                nbtData.writeTagFloat(parseFloat(elementData.slice(0, -1)), elementName);
                                break;
                            }

                            case 'd': {
                                nbtData.writeTagDouble(parseFloat(elementData.slice(0, -1)), elementName);
                                break;
                            }
                        }
                        break;
                    }
                }

                nbtData.writeTagString(elementData, elementName);
                break;
            }

            default: {
                nbtData.writeTagInt(0, elementName);
                break;
            }
        }
    });

    nbtData.writeTagEnd();

    return nbtData.buffer;
}
