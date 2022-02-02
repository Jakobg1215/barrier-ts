import { generateKeyPairSync } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type BarrierTs from '../BarrierTs';
import type Connection from '../network/Connection';
import DataBuffer from '../network/DataBuffer';
import DimensionType from '../network/DimensionType';
import type GamePacketListener from '../network/GamePacketListener';
import type ClientBoundPacket from '../network/protocol/ClientBoundPacket';
import ClientBoundChangeDifficultyPacket from '../network/protocol/game/ClientBoundChangeDifficultyPacket';
import ClientBoundCustomPayloadPacket from '../network/protocol/game/ClientBoundCustomPayloadPacket';
import ClientBoundLevelChunkWithLightPacket from '../network/protocol/game/ClientBoundLevelChunkWithLightPacket';
import ClientBoundLoginPacket from '../network/protocol/game/ClientBoundLoginPacket';
import ClientBoundPlayerAbilitiesPacket from '../network/protocol/game/ClientBoundPlayerAbilitiesPacket';
import ClientBoundSetCarriedItemPacket from '../network/protocol/game/ClientBoundSetCarriedItemPacket';
import ClientBoundSetChunkCacheCenterPacket from '../network/protocol/game/ClientBoundSetChunkCacheCenterPacket';
import RegistryHolder from '../network/RegistryHolder';
import NameSpace from '../types/classes/NameSpace';
import { Difficulty } from '../types/enums/Difficulty';
import { GameType } from '../types/enums/GameType';
import type SavedData from '../types/SavedData';
import NbtReader from '../utilitys/NbtReader';
import objectToNbt from '../utilitys/objectToNbt';
import type Player from './entities/Player';

export default class PlayerManager {
    public readonly connections = new Set<Connection>();
    public readonly players = new Map<Connection, Player>();
    public readonly padLock = generateKeyPairSync('rsa', {
        modulusLength: 1024,
        publicKeyEncoding: {
            type: 'spki',
            format: 'der',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    });

    public constructor(private readonly server: BarrierTs) {}

    public tick() {
        this.connections.forEach(connection => connection.tick());
        this.players.forEach(player => player.tick());
    }

    public sendAll(packet: ClientBoundPacket, ...execlude: number[]) {
        for (const [connection, player] of this.players.entries()) {
            if (execlude.includes(player.id)) return;
            connection.send(packet);
        }
    }

    public async loginPlayer(gamelistener: GamePacketListener): Promise<void> {
        const playerData = await this.getPlayerData(gamelistener.connection);
        const chunkX = Math.floor(playerData.position.x / 16);
        const chunkZ = Math.floor(playerData.position.z / 16);
        gamelistener.player.isFlying = playerData.flying;

        gamelistener.send(
            new ClientBoundLoginPacket(
                0,
                0n,
                false,
                GameType.CREATIVE,
                GameType.CREATIVE,
                [new NameSpace('minecraft', 'overworld')],
                objectToNbt(RegistryHolder),
                objectToNbt(DimensionType),
                new NameSpace('minecraft', 'overworld'),
                this.server.config.maxplayers,
                8,
                8,
                false,
                true,
                false,
                true,
            ),
        );

        gamelistener.send(
            new ClientBoundCustomPayloadPacket(
                new NameSpace('minecraft', 'brand'),
                new DataBuffer().writeString(this.server.config.serverName).buffer,
            ),
        );

        gamelistener.send(new ClientBoundChangeDifficultyPacket(Difficulty.HARD, true));

        gamelistener.send(new ClientBoundPlayerAbilitiesPacket(true, !!playerData.flying, true, true, 0.05, 0.1));

        gamelistener.send(new ClientBoundSetCarriedItemPacket(0));

        gamelistener.send(new ClientBoundSetChunkCacheCenterPacket(chunkX, chunkZ));

        this.server.world.sendWorldData(gamelistener.connection);

        const chunkdata = new DataBuffer()
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

        gamelistener.send(
            new ClientBoundLevelChunkWithLightPacket(
                chunkX,
                chunkZ,
                objectToNbt({}),
                chunkdata.buffer,
                [],
                [3n],
                [0n],
                [2n],
                [7n],
                [Array.from({ length: 2048 }).fill(0) as number[], Array.from({ length: 2048 }).fill(255) as number[]],
                [],
                true,
            ),
        );

        gamelistener.teleport(
            playerData.position.x,
            playerData.position.y,
            playerData.position.z,
            playerData.rotation.y,
            playerData.rotation.x,
        );

        for (let x = chunkX - 8; x < chunkX + 8; x++) {
            for (let z = chunkZ - 8; z < chunkZ + 8; z++) {
                gamelistener.send(
                    new ClientBoundLevelChunkWithLightPacket(
                        x,
                        z,
                        objectToNbt({}),
                        chunkdata.buffer,
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
    }

    private async getPlayerData(conn: Connection): Promise<SavedData> {
        const player = this.players.get(conn);
        const baseValues = this.getDefaultPlayerData();
        if (!player) return baseValues;
        try {
            const fileData = await readFile(
                join(__dirname, '../../world/players', player.gameProfile.id?.toString()! + '.nbt'),
            );
            const nbtData = NbtReader.readData(fileData, false)[0];
            return { ...baseValues, ...nbtData };
        } catch {
            return baseValues;
        }
    }

    private getDefaultPlayerData(): SavedData {
        return {
            position: {
                x: 0,
                y: -60,
                z: 0,
            },
            rotation: {
                x: 0,
                y: 0,
            },
            flying: false,
        };
    }

    public savePlayer(conn: Connection) {
        const player = this.players.get(conn);
        if (!player) return;
        const data = {
            position: {
                x: player.pos.x + 'd',
                y: player.pos.y + 'd',
                z: player.pos.z + 'd',
            },
            rotation: {
                x: player.rot.x + 'f',
                y: player.rot.y + 'f',
            },
            flying: player.isFlying ? '1b' : '0b',
        };
        mkdir(join(__dirname, '../../world/players'), { recursive: true }).then(_path => {
            writeFile(
                join(__dirname, '../../world/players', player.gameProfile.id?.toString()! + '.nbt'),
                objectToNbt(data),
            );
        });
    }
}
