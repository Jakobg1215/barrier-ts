import { Buffer } from 'node:buffer';
import { Cipher, createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import type { Socket } from 'node:net';
import { join } from 'node:path';
import { deflateSync, inflateSync } from 'node:zlib';
import type BarrierTs from '../BarrierTs';
import BlockPos from '../types/classes/BlockPos';
import type Chat from '../types/classes/Chat';
import Slot from '../types/classes/Slot';
import Vector2 from '../types/classes/Vector2';
import Vector3 from '../types/classes/Vector3';
import DimensionType from '../types/DimensionType';
import { Difficulty } from '../types/enums/Difficulty';
import { GameType } from '../types/enums/GameType';
import type GameProfile from '../types/GameProfile';
import type PlayerSave from '../types/PlayerSave';
import RegistryHolder from '../types/RegistryHolder';
import ObjectToNbt from '../utilities/ObjectToNbt';
import Player from '../world/entity/Player';
import type Handler from './handlers/Handler';
import type ClientboundPacket from './packets/ClientbountPacket';
import ClientboundAddPlayerPacket from './packets/game/ClientboundAddPlayerPacket';
import ClientboundChangeDifficultyPacket from './packets/game/ClientboundChangeDifficultyPacket';
import ClientboundContainerSetSlotPacket from './packets/game/ClientboundContainerSetSlotPacket';
import ClientboundCustomPayloadPacket from './packets/game/ClientboundCustomPayloadPacket';
import ClientboundDisconnectPacket from './packets/game/ClientboundDisconnectPacket';
import ClientboundKeepAlivePacket from './packets/game/ClientboundKeepAlivePacket';
import ClientboundLevelChunkWithLightPacket from './packets/game/ClientboundLevelChunkWithLightPacket';
import ClientboundLoginPacket from './packets/game/ClientboundLoginPacket';
import ClientboundPlayerAbilitiesPacket from './packets/game/ClientboundPlayerAbilitiesPacket';
import ClientboundPlayerInfoPacket from './packets/game/ClientboundPlayerInfoPacket';
import ClientboundPlayerPositionPacket from './packets/game/ClientboundPlayerPositionPacket';
import ClientboundRemoveEntitiesPacket from './packets/game/ClientboundRemoveEntitiesPacket';
import ClientboundSetCarriedItemPacket from './packets/game/ClientboundSetCarriedItemPacket';
import ClientboundSetChunkCacheCenterPacket from './packets/game/ClientboundSetChunkCacheCenterPacket';
import ClientboundSetDefaultSpawnPositionPacket from './packets/game/ClientboundSetDefaultSpawnPositionPacket';
import ClientboundSetEquipmentPacket from './packets/game/ClientboundSetEquipmentPacket';
import ClientboundGameProfilePacket from './packets/login/ClientboundGameProfilePacket';
import ClientboundLoginDisconnectPacket from './packets/login/ClientboundLoginDisconnectPacket';
import Packet from './packets/Packet';
import type ServerboundPacket from './packets/ServerboundPacket';
import { ProtocolState } from './Protocol';

export default class Connection {
    private connectionProtocolState: ProtocolState = ProtocolState.HANDSHAKING;
    private readonly connectionNonce: Buffer = randomBytes(4);
    private connectionKey!: Buffer;
    private readonly connectionNetworking: Socket;
    private readonly connectionServer: BarrierTs;
    private connectionName: string = 'OFFLINE';
    private connectionPlayer: Player = new Player(
        { name: 'OFFLINE', uuid: '00000000000000000000000000000000', properties: [] },
        -1,
    );
    private connectionEncrypted: boolean = false;
    private connectionEncrtyption!: Cipher;
    private connectionDecryption!: Cipher;
    private connectionCompression: boolean = false;
    private connnectionNetworkClosed: boolean = false;
    private connectionConnected: boolean = false;
    private connectionKeepAliveId: Buffer = randomBytes(8);
    private readonly connectionkeepAliveLoop: NodeJS.Timer;
    private connectionTeleportId: Buffer = randomBytes(4);

    public constructor(socket: Socket, server: BarrierTs) {
        this.connectionNetworking = socket;
        this.connectionServer = server;

        this.connectionNetworking.on('data', (data: Buffer) => {
            const inPacket: Packet = new Packet(
                this.connectionConnected && this.connectionEncrypted ? this.connectionDecryption.update(data) : data,
            );

            if (this.connectionCompression) {
                do {
                    if (this.connnectionNetworkClosed) return;

                    const compressedInPacket: Packet = new Packet(inPacket.getReadableBytes());

                    const packetLength: number = inPacket.readVarInt();
                    compressedInPacket.readVarInt();

                    const dataLength: number = compressedInPacket.readVarInt();
                    const packetData: Packet = new Packet(
                        dataLength > 0
                            ? inflateSync(compressedInPacket.getReadableBytes())
                            : compressedInPacket.getReadableBytes(),
                    );

                    // TODO: Need to handle invalid packet length

                    inPacket.addOffset(packetLength, true);

                    const packetid: number = packetData.readVarInt();

                    const readPacket: ServerboundPacket | null = this.connectionServer.protocol.getPacket(
                        this.connectionProtocolState,
                        packetid,
                    );

                    if (!readPacket)
                        return this.connectionServer.console.error(
                            `Server packet ${packetid} not found for state ${this.connectionProtocolState}!`,
                        );

                    try {
                        readPacket.read(packetData);
                    } catch {
                        server.console.error(
                            `Read error for packet ${packetid} on state ${this.connectionProtocolState}!`,
                        );
                        return;
                    }

                    const packetHandle: Handler<ServerboundPacket> | null = this.connectionServer.protocol.getHandler(
                        this.connectionProtocolState,
                        packetid,
                    );

                    if (!packetHandle)
                        return this.connectionServer.console.warn(
                            `Server handler ${packetid} not found for state ${this.connectionProtocolState}!`,
                        );

                    try {
                        packetHandle.hander(readPacket, this, this.connectionServer);
                    } catch {
                        server.console.error(
                            `Failed to handler packet ${packetid} on state ${this.connectionProtocolState}!`,
                        );
                    }
                } while (inPacket.getReadableBytes().length > 0);
                return;
            }

            do {
                if (this.connnectionNetworkClosed) return;

                //const packetLength: number = inPacket.readVarInt();
                inPacket.readVarInt();

                // TODO: Need to handle invalid packet length

                const packetid: number = inPacket.readVarInt();

                const readPacket: ServerboundPacket | null = this.connectionServer.protocol.getPacket(
                    this.connectionProtocolState,
                    packetid,
                );

                if (!readPacket)
                    return this.connectionServer.console.error(
                        `Server packet ${packetid} not found for state ${this.connectionProtocolState}!`,
                    );

                try {
                    readPacket.read(inPacket);
                } catch {
                    server.console.error(`Read error for packet ${packetid} on state ${this.connectionProtocolState}!`);
                    return;
                }

                const packetHandle: Handler<ServerboundPacket> | null = this.connectionServer.protocol.getHandler(
                    this.connectionProtocolState,
                    packetid,
                );

                if (!packetHandle)
                    return this.connectionServer.console.warn(
                        `Server handler ${packetid} not found for state ${this.connectionProtocolState}!`,
                    );

                try {
                    packetHandle.hander(readPacket, this, this.connectionServer);
                } catch {
                    server.console.error(
                        `Failed to handler packet ${packetid} on state ${this.connectionProtocolState}!`,
                    );
                }
            } while (inPacket.getReadableBytes().length > 0);
        });

        this.connectionNetworking.on('close', () => {
            this.connnectionNetworkClosed = true;
            this.connectionCompression = false;
            this.connectionEncrypted = false;
            if (this.connectionConnected) {
                this.connectionServer.removePlayer();
                this.connectionServer.brodcast(
                    new ClientboundPlayerInfoPacket(4, [
                        {
                            latency: 0,
                            gameMode: GameType.CREATIVE,
                            profile: this.connectionPlayer.gameProfile,
                            displayName: this.connectionPlayer.userName,
                        },
                    ]),
                );
                this.connectionServer.brodcast(new ClientboundRemoveEntitiesPacket([this.connectionPlayer.id]));
            }
            clearInterval(this.connectionkeepAliveLoop);
            if (this.protocolState === ProtocolState.PLAY) this.save();
            this.connectionServer.connections.delete(this);
        });

        this.connectionNetworking.on('error', error => {
            this.connectionServer.console.error(`Client had an ${error.message}`);
        });

        this.connectionkeepAliveLoop = setInterval(() => {
            if (this.connectionConnected) {
                this.connectionKeepAliveId = randomBytes(8);
                this.send(new ClientboundKeepAlivePacket(this.connectionKeepAliveId.readBigInt64BE()));
            }
        }, 15000);
    }

    public createPlayer(gameProfile: GameProfile): void {
        this.connectionPlayer = new Player(gameProfile, this.connectionServer.world.giveUniqueId());
    }

    public setProtocolState(state: ProtocolState): void {
        this.connectionProtocolState = state;
    }

    public disconnect(reason: Chat): void {
        switch (this.connectionProtocolState) {
            case ProtocolState.LOGIN: {
                this.send(new ClientboundLoginDisconnectPacket(reason));
                break;
            }

            case ProtocolState.PLAY: {
                this.send(new ClientboundDisconnectPacket(reason));
                break;
            }
        }
        this.end();
    }

    public login(): void {
        this.connectionConnected = true;
        this.send(new ClientboundGameProfilePacket(this.connectionPlayer.gameProfile));
        this.setProtocolState(ProtocolState.PLAY);
        this.send(
            new ClientboundLoginPacket(
                this.connectionPlayer.id,
                0n,
                false,
                GameType.CREATIVE,
                GameType.CREATIVE,
                ['minecraft:overworld', 'minecraft:the_nether', 'minecraft:the_end'],
                ObjectToNbt(RegistryHolder),
                ObjectToNbt(DimensionType),
                'minecraft:overworld',
                this.connectionServer.config.maxplayers,
                8,
                8,
                false,
                true,
                false,
                true,
            ),
        );
        this.send(
            new ClientboundCustomPayloadPacket(
                'minecraft:brand',
                new Packet()
                    .writeString(
                        this.connectionServer.config.serverId.length > 0
                            ? `BarrierTs: ${this.connectionServer.config.serverId}`
                            : `BarrierTs`,
                    )
                    .getReadableBytes(),
            ),
        );
        this.send(new ClientboundChangeDifficultyPacket(Difficulty.NORMAL, true));
        const playerData: PlayerSave = this.getSave();
        this.connectionPlayer.isFlying = playerData.isFlying;
        this.connectionPlayer.updatePosition(
            new Vector3(playerData.position.x, playerData.position.y, playerData.position.z),
        );
        this.connectionPlayer.updateRotation(new Vector2(playerData.rotation.x, playerData.rotation.y));
        this.send(new ClientboundPlayerAbilitiesPacket(true, playerData.isFlying, true, true, 0.05, 0.1));
        this.send(
            new ClientboundPlayerInfoPacket(
                0,
                Array.from(this.connectionServer.connections)
                    .filter(element => element.protocolState === ProtocolState.PLAY)
                    .map(element => {
                        return {
                            latency: 0,
                            gameMode: GameType.CREATIVE,
                            profile: element.connectionPlayer.gameProfile,
                            displayName: element.connectionPlayer.userName,
                        };
                    }),
            ),
        );
        this.connectionServer.brodcast(
            new ClientboundPlayerInfoPacket(0, [
                {
                    latency: 0,
                    gameMode: GameType.CREATIVE,
                    profile: this.connectionPlayer.gameProfile,
                    displayName: this.connectionPlayer.userName,
                },
            ]),
            [this.connectionPlayer.id],
        );
        Array.from(this.connectionServer.connections)
            .filter(element => element.protocolState === ProtocolState.PLAY)
            .forEach(element => {
                if (element.connectionPlayer.id === this.connectionPlayer.id) return;
                this.send(
                    new ClientboundAddPlayerPacket(
                        element.player.id,
                        element.player.gameProfile.uuid,
                        element.player.position.x,
                        element.player.position.y,
                        element.player.position.z,
                        (element.player.rotation.y * 256) / 360,
                        (element.player.rotation.x * 256) / 360,
                    ),
                );
            });
        this.connectionServer.brodcast(
            new ClientboundAddPlayerPacket(
                this.connectionPlayer.id,
                this.connectionPlayer.gameProfile.uuid,
                this.connectionPlayer.position.x,
                this.connectionPlayer.position.y,
                this.connectionPlayer.position.z,
                (this.connectionPlayer.rotation.y * 256) / 360,
                (this.connectionPlayer.rotation.x * 256) / 360,
            ),
            [this.connectionPlayer.id],
        );
        this.send(new ClientboundSetChunkCacheCenterPacket(0, 0));

        const chunkdata = new Packet()
            .writeShort(1024)
            .writeUnsignedByte(4)
            .writeVarInt(4)
            .writeVarInt(33)
            .writeVarInt(10)
            .writeVarInt(9)
            .writeVarInt(0)
            .writeVarInt(256);

        for (let bedrock = 0; bedrock < 16; bedrock++) {
            chunkdata.writeLong(0n);
        }
        for (let dirt = 0; dirt < 32; dirt++) {
            chunkdata.writeLong(1229782938247303441n);
        }
        for (let grass = 0; grass < 16; grass++) {
            chunkdata.writeLong(2459565876494606882n);
        }
        for (let air = 0; air < 192; air++) {
            chunkdata.writeLong(3689348814741910323n);
        }

        chunkdata.writeUnsignedByte(0).writeVarInt(0).writeVarInt(0);

        for (let index = 0; index < 27; index++) {
            chunkdata
                .writeShort(0)
                .writeUnsignedByte(0)
                .writeVarInt(0)
                .writeVarInt(0)
                .writeUnsignedByte(0)
                .writeVarInt(0)
                .writeVarInt(0);
        }

        for (let x = -8; x < 8; x++) {
            for (let z = -8; z < 8; z++) {
                this.send(
                    new ClientboundLevelChunkWithLightPacket(
                        x,
                        z,
                        ObjectToNbt({}),
                        chunkdata.getReadableBytes(),
                        [],
                        [3n],
                        [0n],
                        [2n],
                        [7n],
                        [
                            Array.from({ length: 2048 }).fill(0) as number[],
                            Array.from({ length: 2048 }).fill(255) as number[],
                        ],
                        [],
                        true,
                    ),
                );
            }
        }
        this.send(new ClientboundSetDefaultSpawnPositionPacket(new BlockPos(0, 4, 0), 0));
        this.send(
            new ClientboundPlayerPositionPacket(
                this.connectionPlayer.position.x,
                this.connectionPlayer.position.y,
                this.connectionPlayer.position.z,
                this.connectionPlayer.rotation.y,
                this.connectionPlayer.rotation.x,
                0,
                this.connectionTeleportId.readInt32BE(),
                false,
            ),
        ); // this should be the last packet for initialisation

        this.send(new ClientboundSetCarriedItemPacket(playerData.heldItemSlot));

        const equipment: { pos: number; item: Slot }[] = [];

        playerData.inventory.forEach(item => {
            this.connectionPlayer.inventory.set(item.slot, new Slot(true, item.id, item.count, Buffer.from(item.nbt)));
            switch (item.slot) {
                case 5: {
                    equipment.push({ pos: 5, item: new Slot(true, item.id, item.count, Buffer.from(item.nbt)) });
                    break;
                }
                case 6: {
                    equipment.push({ pos: 4, item: new Slot(true, item.id, item.count, Buffer.from(item.nbt)) });
                    break;
                }
                case 7: {
                    equipment.push({ pos: 3, item: new Slot(true, item.id, item.count, Buffer.from(item.nbt)) });
                    break;
                }
                case 8: {
                    equipment.push({ pos: 2, item: new Slot(true, item.id, item.count, Buffer.from(item.nbt)) });
                    break;
                }
                case 45: {
                    equipment.push({ pos: 1, item: new Slot(true, item.id, item.count, Buffer.from(item.nbt)) });
                    break;
                }
                case playerData.heldItemSlot + 36: {
                    equipment.push({ pos: 0, item: new Slot(true, item.id, item.count, Buffer.from(item.nbt)) });
                }
            }

            this.send(
                new ClientboundContainerSetSlotPacket(
                    0,
                    0,
                    item.slot,
                    new Slot(true, item.id, item.count, Buffer.from(item.nbt)),
                ),
            );
        });

        if (equipment.length > 0)
            this.connectionServer.brodcast(new ClientboundSetEquipmentPacket(this.connectionPlayer.id, equipment), [
                this.connectionPlayer.id,
            ]);

        if (!this.connectionConnected) return;
        this.connectionServer.addPlayer();
        this.connectionServer.console.log(`Player ${this.connectionPlayer.gameProfile.name} has joined the game!`);
    }

    public end(): void {
        this.connnectionNetworkClosed = true;
        this.connectionNetworking.end();
    }

    public send(data: ClientboundPacket): void {
        const packetId = this.connectionServer.protocol.getId(this.connectionProtocolState, data);
        if (packetId === null) return this.connectionServer.console.error('Could not find packet id!');
        const dataWrite = data.write();
        let dataChange: Buffer = dataWrite.getReadableBytes();

        if (this.connectionCompression) {
            if (dataChange.length >= this.connectionServer.config.compression) {
                const uncompressed = new Packet()
                    .writeVarInt(packetId)
                    .append(dataWrite.getReadableBytes())
                    .getReadableBytes().length;
                const compressed = deflateSync(
                    new Packet().writeVarInt(packetId).append(dataWrite.getReadableBytes()).getReadableBytes(),
                );
                dataChange = Buffer.concat([
                    new Packet().writeVarInt(Packet.sizeVarInt(uncompressed) + compressed.length).getReadableBytes(),
                    new Packet().writeVarInt(uncompressed).getReadableBytes(),
                    compressed,
                ]);
            } else {
                const uncompressed = new Packet()
                    .writeVarInt(packetId)
                    .append(dataWrite.getReadableBytes())
                    .getReadableBytes();

                dataChange = Buffer.concat([
                    new Packet().writeVarInt(Packet.sizeVarInt(0) + uncompressed.length).getReadableBytes(),
                    new Packet().writeVarInt(0).getReadableBytes(),
                    uncompressed,
                ]);
            }
        } else {
            dataChange = dataWrite.buildPacket(packetId);
        }

        if (this.connectionEncrypted) {
            dataChange = this.connectionEncrtyption.update(dataChange);
        }

        if (this.connnectionNetworkClosed) return;

        this.connectionNetworking.write(dataChange);
    }

    public setName(name: string): void {
        this.connectionName = name;
    }

    public setKey(key: Buffer): void {
        this.connectionKey = key;
    }

    public enableEncryption(): void {
        this.connectionEncrypted = true;
        this.connectionEncrtyption = createCipheriv('aes-128-cfb8', this.connectionKey, this.connectionKey);
        this.connectionDecryption = createDecipheriv('aes-128-cfb8', this.connectionKey, this.connectionKey);
    }

    public enableCompression(): void {
        this.connectionCompression = true;
    }

    public save(): void {
        this.checkSaves();
        const data: PlayerSave = {
            position: {
                x: this.connectionPlayer.position.x,
                y: this.connectionPlayer.position.y,
                z: this.connectionPlayer.position.z,
            },
            rotation: {
                x: this.connectionPlayer.rotation.x,
                y: this.connectionPlayer.rotation.y,
            },
            isFlying: this.connectionPlayer.isFlying,
            heldItemSlot: this.connectionPlayer.heldItemSlot,
            inventory: Array.from(this.connectionPlayer.inventory)
                .filter(item => item[1].present)
                .map(
                    ([place, item]): {
                        slot: number;
                        id: number;
                        count: number;
                        nbt: number[];
                    } => {
                        return { slot: place, id: item.id, count: item.count, nbt: item.nbt.toJSON().data };
                    },
                ),
        };
        writeFile(
            join(__dirname, `../../world/players/${this.connectionPlayer.gameProfile.uuid}`),
            JSON.stringify(data),
            { encoding: 'utf-8' },
        );
    }

    private createSave(): void {
        const data: PlayerSave = {
            position: {
                x: 0.5,
                y: -60,
                z: 0.5,
            },
            rotation: {
                x: 0,
                y: 0,
            },
            isFlying: false,
            heldItemSlot: 0,
            inventory: [],
        };

        writeFileSync(
            join(__dirname, `../../world/players/${this.connectionPlayer.gameProfile.uuid}`),
            JSON.stringify(data),
            { encoding: 'utf-8' },
        );
    }

    private checkSaves(): void {
        if (!existsSync(join(__dirname, '../../world'))) {
            mkdirSync(join(__dirname, '../../world'));
            mkdirSync(join(__dirname, '../../world/players'));
        }
        if (!existsSync(join(__dirname, '../../world/players'))) {
            mkdirSync(join(__dirname, '../../world/players'));
        }
        if (!existsSync(join(__dirname, `../../world/players/${this.connectionPlayer.gameProfile.uuid}`)))
            this.createSave();
    }

    public getSave(): PlayerSave {
        this.checkSaves();
        try {
            return JSON.parse(
                readFileSync(join(__dirname, `../../world/players/${this.connectionPlayer.gameProfile.uuid}`), {
                    encoding: 'utf-8',
                }),
            );
        } catch {
            this.createSave();
            this.connectionServer.console.error(
                `Failed to read player data for ${this.connectionPlayer.gameProfile.uuid}!`,
            );
            this.connectionServer.console.debug('Falling back to default save.');
            return JSON.parse(
                readFileSync(join(__dirname, `../../world/players/${this.connectionPlayer.gameProfile.uuid}`), {
                    encoding: 'utf-8',
                }),
            );
        }
    }

    public get protocolState(): ProtocolState {
        return this.connectionProtocolState;
    }

    public get networking(): Socket {
        return this.connectionNetworking;
    }

    public get player(): Player {
        return this.connectionPlayer;
    }

    public get nonce(): Buffer {
        return this.connectionNonce;
    }

    public get name(): string {
        return this.connectionName;
    }

    public get keepAliveId(): Buffer {
        return this.connectionKeepAliveId;
    }

    public get teleportId(): Buffer {
        return this.connectionTeleportId;
    }
}
