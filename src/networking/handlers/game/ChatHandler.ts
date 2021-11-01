import type BarrierTs from '../../../BarrierTs';
import Chat from '../../../types/classes/Chat';
import type Connection from '../../Connection';
import type ClientboundPacket from '../../packets/ClientbountPacket';
import ClientboundChatPacket from '../../packets/game/ClientboundChatPacket';
import type ServerboundChatPacket from '../../packets/game/ServerboundChatPacket';
import Packet from '../../packets/Packet';
import type Handler from '../Handler';

export default class ChatHandler implements Handler<ServerboundChatPacket> {
    public hander(packet: ServerboundChatPacket, connection: Connection, server: BarrierTs): void {
        if (packet.message !== '/test') {
            return server.brodcast(
                new ClientboundChatPacket(
                    new Chat().addTranslate(
                        'chat.type.text',
                        new Chat().addText(connection.player.gameProfile.name).addText(packet.message),
                    ),
                    0,
                    connection.player.gameProfile.uuid,
                ),
            );
        }

        connection.send(
            new (class test implements ClientboundPacket {
                public readonly id: number = 0x2e;

                public write(): Packet {
                    return new Packet().writeVarInt(0).writeVarInt(7).writeChat(new Chat().addText('test'));
                }
            })(),
        );

        connection.send(
            new (class test implements ClientboundPacket {
                public readonly id: number = 0x15;

                public write(): Packet {
                    return new Packet().writeUnsignedByte(3).writeShort(0).writeShort(1);
                }
            })(),
        );

        /*

        connection.send(
            new (class test implements ClientboundPacket {
                public readonly id: number = 0x49;

                public write(): Packet {
                    return new Packet().writeVarInt(0).writeVarInt(0);
                }
            })(),
        );

        class testclass implements ClientboundPacket {
            public readonly id: number = 0x22;
            public x: number;
            public z: number;

            public constructor(x: number, z: number) {
                this.x = x;
                this.z = z;
            }

            public write(): Packet {
                return new Packet()
                    .writeInt(this.x)
                    .writeInt(this.z)
                    .append(readFileSync(join(__dirname, '../../../../../testjs/test.dat')).slice(11));
                /*
                const data1 = new Packet()
                    .writeInt(this.x)
                    .writeInt(this.z)
                    .writeVarInt(1)
                    .writeLong(1n)
                    .append(
                        ObjectToNbt({
                            MOTION_BLOCKING: [
                                ':LA:',
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                537921540n,
                            ],
                            WORLD_SURFACE: [
                                ':LA:',
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                72198606942111748n,
                                537921540n,
                            ],
                        }),
                    )
                    .writeVarInt(1024);

                for (let index = 0; index < 1024; index++) {
                    data1.writeVarInt(1);
                }

                const data2 = new Packet()
                    .writeShort(1024)
                    .writeUnsignedByte(4)
                    .writeVarInt(4)
                    .writeVarInt(0)
                    .writeVarInt(33)
                    .writeVarInt(10)
                    .writeVarInt(9)
                    .writeVarInt(256);

                for (let index = 0; index < 16; index++) {
                    data2.writeLong(1229782938247303441n);
                }

                for (let index = 0; index < 32; index++) {
                    data2.writeLong(2459565876494606882n);
                }

                for (let index = 0; index < 16; index++) {
                    data2.writeLong(3689348814741910323n);
                }

                for (let index = 0; index < 192; index++) {
                    data2.writeLong(0n);
                }

                return new Packet()
                    .append(data1.getReadableBytes())
                    .writeVarInt(data2.getReadableBytes().length)
                    .append(data2.getReadableBytes())
                    .append(Buffer.alloc(1));
            }
        }
        for (let x = -10; x < 10; x++) {
            for (let z = -10; z < 10; z++) {
                connection.send(new testclass(x, z));
            }
        }*/
    }
}
