import { generateKeyPairSync } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type BarrierTs from '../BarrierTs';
import type Connection from '../network/Connection';
import DataBuffer from '../network/DataBuffer';
import DimensionType from '../network/DimensionType';
import type GamePacketListener from '../network/GamePacketListener';
import type ClientBoundPacket from '../network/protocol/ClientBoundPacket';
import ClientBoundAddPlayerPacket from '../network/protocol/game/ClientBoundAddPlayerPacket';
import ClientBoundChangeDifficultyPacket from '../network/protocol/game/ClientBoundChangeDifficultyPacket';
import ClientBoundCustomPayloadPacket from '../network/protocol/game/ClientBoundCustomPayloadPacket';
import ClientBoundLevelChunkWithLightPacket from '../network/protocol/game/ClientBoundLevelChunkWithLightPacket';
import ClientBoundLoginPacket from '../network/protocol/game/ClientBoundLoginPacket';
import ClientBoundPlayerAbilitiesPacket from '../network/protocol/game/ClientBoundPlayerAbilitiesPacket';
import ClientBoundPlayerInfoPacket, {
    Action,
    PlayerUpdate,
} from '../network/protocol/game/ClientBoundPlayerInfoPacket';
import ClientBoundSetCarriedItemPacket from '../network/protocol/game/ClientBoundSetCarriedItemPacket';
import ClientBoundSetChunkCacheCenterPacket from '../network/protocol/game/ClientBoundSetChunkCacheCenterPacket';
import RegistryHolder from '../network/RegistryHolder';
import Chat, { ChatType } from '../types/classes/Chat';
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
            if (execlude.includes(player.id)) continue;
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
                gamelistener.player.id,
                0n,
                false,
                GameType.CREATIVE,
                GameType.CREATIVE,
                [
                    new NameSpace('minecraft', 'overworld'),
                    new NameSpace('minecraft', 'the_nether'),
                    new NameSpace('minecraft', 'the_end'),
                ],
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

        gamelistener.send(
            new ClientBoundLevelChunkWithLightPacket(
                chunkX,
                chunkZ,
                objectToNbt({}),
                this.server.world.levelChunks.get((BigInt(chunkX) << 32n) | (BigInt(chunkZ) & 0xffffffffn))!.toBuffer(),
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

        this.server.world.sendWorldData(gamelistener.connection);

        this.server.console.log(
            '%s (%s) has joined the server!',
            gamelistener.player.gameProfile.name,
            gamelistener.player.id,
        );

        const players: PlayerUpdate[] = [];

        this.players.forEach(player =>
            players.push({
                latency: 0,
                gameMode: GameType.CREATIVE,
                profile: player.gameProfile,
                displayName: new Chat(ChatType.TEXT, player.gameProfile.name),
            }),
        );

        this.sendAll(new ClientBoundPlayerInfoPacket(Action.ADD_PLAYER, players));

        this.sendAll(
            new ClientBoundAddPlayerPacket(
                gamelistener.player.id,
                gamelistener.player.gameProfile.id,
                gamelistener.player.pos.x,
                gamelistener.player.pos.y,
                gamelistener.player.pos.z,
                (gamelistener.player.rot.y * 256.0) / 360.0,
                (gamelistener.player.rot.x * 256.0) / 360.0,
            ),
            gamelistener.player.id,
        );

        this.players.forEach(player => {
            if (player.id === gamelistener.player.id) return;
            gamelistener.send(
                new ClientBoundAddPlayerPacket(
                    player.id,
                    player.gameProfile.id,
                    player.pos.x,
                    player.pos.y,
                    player.pos.z,
                    (player.rot.y * 256.0) / 360.0,
                    (player.rot.x * 256.0) / 360.0,
                ),
            );
        });

        gamelistener.teleport(
            playerData.position.x,
            playerData.position.y,
            playerData.position.z,
            playerData.rotation.y,
            playerData.rotation.x,
        );
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
