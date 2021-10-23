import type { Buffer } from 'node:buffer';
import NbtWriter from './NbtWriter';
// TODO: Finnish this if needed
export default function ObjectToNbt(data: object): Buffer {
    const elements: [string, any][] = Object.entries(data);
    const nbtData: NbtWriter = new NbtWriter();

    nbtData.writeUnsignedByte(TagIds.COMPOUND);
    nbtData.writeUnsignedShort(0);

    const writeList = (listData: any[]) => {
        switch (typeof listData[0]) {
            case 'number': {
                break;
            }

            case 'object': {
                if (Array.isArray(listData[0])) {
                    break;
                }

                nbtData.writeUnsignedByte(TagIds.COMPOUND);
                nbtData.writeInt(listData.length);
                listData.forEach((element: object) => {
                    writeCompound(Object.entries(element));
                });
                break;
            }

            case 'string': {
                break;
            }

            case 'undefined': {
                nbtData.writeUnsignedByte(TagIds.END);
                nbtData.writeInt(TagIds.END);
                nbtData.writeByte(TagIds.END);
                break;
            }
        }
    };

    const writeCompound = (compoundData: [string, any][]) => {
        compoundData.forEach(([elemnentName, elementData]) => {
            switch (typeof elementData) {
                case 'number': {
                    nbtData.writeUnsignedByte(TagIds.INT);
                    nbtData.writeString(elemnentName);
                    nbtData.writeInt(elementData);
                    break;
                }

                case 'object': {
                    if (Array.isArray(elementData)) {
                        nbtData.writeUnsignedByte(TagIds.LIST);
                        nbtData.writeString(elemnentName);
                        writeList(elementData);
                        break;
                    }

                    nbtData.writeUnsignedByte(TagIds.COMPOUND);
                    nbtData.writeString(elemnentName);
                    writeCompound(Object.entries(elementData));
                    break;
                }

                case 'string': {
                    if (elementData.slice(-1).match(/[bslfd]/)) {
                        if (elementData.slice(0, -1).match(/^[0-9.-]*$/)) {
                            switch (elementData.slice(-1)) {
                                case 'b': {
                                    nbtData.writeUnsignedByte(TagIds.BYTE);
                                    nbtData.writeString(elemnentName);
                                    nbtData.writeByte(parseInt(elementData.slice(0, -1)));
                                    break;
                                }

                                case 's': {
                                    nbtData.writeUnsignedByte(TagIds.SHORT);
                                    nbtData.writeString(elemnentName);
                                    nbtData.writeShort(parseInt(elementData.slice(0, -1)));
                                    break;
                                }

                                case 'l': {
                                    nbtData.writeUnsignedByte(TagIds.LONG);
                                    nbtData.writeString(elemnentName);
                                    nbtData.writeLong(BigInt(parseInt(elementData.slice(0, -1))));
                                    break;
                                }

                                case 'f': {
                                    nbtData.writeUnsignedByte(TagIds.FLOAT);
                                    nbtData.writeString(elemnentName);
                                    nbtData.writeFloat(parseFloat(elementData.slice(0, -1)));
                                    break;
                                }

                                case 'd': {
                                    nbtData.writeUnsignedByte(TagIds.DOUBLE);
                                    nbtData.writeString(elemnentName);
                                    nbtData.writeDouble(parseFloat(elementData.slice(0, -1)));
                                    break;
                                }
                            }
                            break;
                        }
                    }

                    nbtData.writeUnsignedByte(TagIds.STRING);
                    nbtData.writeString(elemnentName);
                    nbtData.writeString(elementData);
                }
            }
        });

        nbtData.writeUnsignedByte(TagIds.END);
    };

    elements.forEach(([elemnentName, elementData]) => {
        switch (typeof elementData) {
            case 'number': {
                nbtData.writeUnsignedByte(TagIds.INT);
                nbtData.writeString(elemnentName);
                nbtData.writeInt(elementData);
                break;
            }

            case 'object': {
                if (Array.isArray(elementData)) {
                    nbtData.writeUnsignedByte(TagIds.LIST);
                    nbtData.writeString(elemnentName);
                    writeList(elementData);
                    break;
                }

                nbtData.writeUnsignedByte(TagIds.COMPOUND);
                nbtData.writeString(elemnentName);
                writeCompound(Object.entries(elementData));
                break;
            }

            case 'string': {
                if (elementData.slice(-1).match(/[bslfd]/)) {
                    if (elementData.slice(0, -1).match(/^[0-9.-]*$/)) {
                        switch (elementData.slice(-1)) {
                            case 'b': {
                                nbtData.writeUnsignedByte(TagIds.BYTE);
                                nbtData.writeString(elemnentName);
                                nbtData.writeByte(parseInt(elementData.slice(0, -1)));
                                break;
                            }

                            case 's': {
                                nbtData.writeUnsignedByte(TagIds.SHORT);
                                nbtData.writeString(elemnentName);
                                nbtData.writeShort(parseInt(elementData.slice(0, -1)));
                                break;
                            }

                            case 'l': {
                                nbtData.writeUnsignedByte(TagIds.LONG);
                                nbtData.writeString(elemnentName);
                                nbtData.writeLong(BigInt(parseInt(elementData.slice(0, -1))));
                                break;
                            }

                            case 'f': {
                                nbtData.writeUnsignedByte(TagIds.FLOAT);
                                nbtData.writeString(elemnentName);
                                nbtData.writeFloat(parseFloat(elementData.slice(0, -1)));
                                break;
                            }

                            case 'd': {
                                nbtData.writeUnsignedByte(TagIds.DOUBLE);
                                nbtData.writeString(elemnentName);
                                nbtData.writeDouble(parseFloat(elementData.slice(0, -1)));
                                break;
                            }
                        }
                        break;
                    }
                }

                nbtData.writeUnsignedByte(TagIds.STRING);
                nbtData.writeString(elemnentName);
                nbtData.writeString(elementData);
            }
        }
    });

    nbtData.writeUnsignedByte(TagIds.END);

    return nbtData.buffer;
}

enum TagIds {
    END,
    BYTE,
    SHORT,
    INT,
    LONG,
    FLOAT,
    DOUBLE,
    BYTEARRAY,
    STRING,
    LIST,
    COMPOUND,
    INTARRAY,
    LONGARRAY,
}
