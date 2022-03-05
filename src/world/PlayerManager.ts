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
import ClientBoundChatPacket from '../network/protocol/game/ClientBoundChatPacket';
import ClientBoundContainerSetContentPacket from '../network/protocol/game/ClientBoundContainerSetContentPacket';
import ClientBoundCustomPayloadPacket from '../network/protocol/game/ClientBoundCustomPayloadPacket';
import ClientBoundLoginPacket from '../network/protocol/game/ClientBoundLoginPacket';
import ClientBoundPlayerAbilitiesPacket from '../network/protocol/game/ClientBoundPlayerAbilitiesPacket';
import ClientBoundPlayerInfoPacket, {
    Action,
    PlayerUpdate,
} from '../network/protocol/game/ClientBoundPlayerInfoPacket';
import ClientBoundRotateHeadPacket from '../network/protocol/game/ClientBoundRotateHeadPacket';
import ClientBoundSetCarriedItemPacket from '../network/protocol/game/ClientBoundSetCarriedItemPacket';
import ClientBoundSetDefaultSpawnPositionPacket from '../network/protocol/game/ClientBoundSetDefaultSpawnPositionPacket';
import ClientBoundSetEntityDatapacket from '../network/protocol/game/ClientBoundSetEntityDataPacket';
import ClientBoundSetEquipmentPacket from '../network/protocol/game/ClientBoundSetEquipmentPacket';
import RegistryHolder from '../network/RegistryHolder';
import BlockPos from '../types/classes/BlockPos';
import Chat, { ChatType } from '../types/classes/Chat';
import Item from '../types/classes/Item';
import NameSpace from '../types/classes/NameSpace';
import { ServerComponent } from '../types/classes/ServerComponent';
import UUID from '../types/classes/UUID';
import { ChatPermission } from '../types/enums/ChatPermission';
import { Difficulty } from '../types/enums/Difficulty';
import { GameType } from '../types/enums/GameType';
import type SavedData from '../types/SavedData';
import NbtReader from '../utilities/NbtReader';
import objectToNbt from '../utilities/objectToNbt';
import type Player from './entities/Player';

export default class PlayerManager extends ServerComponent {
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

    public constructor(private readonly server: BarrierTs) {
        super();
    }

    public override tick() {
        this.connections.forEach(connection => connection.tick());
        this.players.forEach(player => player.tick());
    }

    public sendAll(packet: ClientBoundPacket, ...exclude: number[]) {
        for (const [connection, player] of this.players.entries()) {
            if (exclude.includes(player.id)) continue;
            connection.send(packet);
        }
    }

    public getPlayerById(id: number): Player | null {
        for (const player of this.players.values()) {
            if (player.id === id) return player;
            // Should do a binary serch here
        }
        return null;
    }

    public async loginPlayer(gamelistener: GamePacketListener): Promise<void> {
        gamelistener.player.setDataFromSave(await this.getPlayerData(gamelistener.connection));

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

        gamelistener.send(
            new ClientBoundPlayerAbilitiesPacket(true, gamelistener.player.isFlying, true, true, 0.05, 0.1),
        );

        gamelistener.send(new ClientBoundSetCarriedItemPacket(0));

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

        gamelistener.teleport(
            gamelistener.player.pos.x,
            gamelistener.player.pos.y,
            gamelistener.player.pos.z,
            gamelistener.player.rot.y,
            gamelistener.player.rot.x,
        );

        gamelistener.chunkLoader.setChunkPosition(gamelistener.player.pos.x >> 4, gamelistener.player.pos.z >> 4);

        this.sendAll(
            new ClientBoundChatPacket(
                new Chat(ChatType.TRANSLATE, 'multiplayer.player.joined', {
                    color: 'yellow',
                    with: [
                        {
                            text: gamelistener.player.gameProfile.name,
                            insertion: gamelistener.player.gameProfile.name,
                            clickEvent: {
                                action: 'suggest_command',
                                value: `/tell ${gamelistener.player.gameProfile.name} `,
                            },
                            hoverEvent: {
                                action: 'show_entity',
                                contents: {
                                    type: 'minecraft:player',
                                    id: gamelistener.player.gameProfile.id.toFormattedString(),
                                    name: { text: gamelistener.player.gameProfile.name },
                                },
                            },
                        },
                    ],
                }),
                ChatPermission.SYSTEM,
                UUID.EMPTY,
            ),
            gamelistener.player.id,
        );

        this.server.console.log(
            '%s (%s) has joined the server!',
            gamelistener.player.gameProfile.name,
            gamelistener.player.id,
        );

        this.sendAll(
            new ClientBoundAddPlayerPacket(
                gamelistener.player.id,
                gamelistener.player.gameProfile.id,
                gamelistener.player.pos.x,
                gamelistener.player.pos.y,
                gamelistener.player.pos.z,
                Math.floor((gamelistener.player.rot.y * 256) / 360),
                Math.floor((gamelistener.player.rot.x * 256) / 360),
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
                    Math.floor((player.rot.y * 256) / 360),
                    Math.floor((player.rot.x * 256) / 360),
                ),
            );

            gamelistener.send(new ClientBoundRotateHeadPacket(player.id, Math.floor((player.rot.y * 256) / 360)));

            gamelistener.send(new ClientBoundSetEntityDatapacket(player.id, player.data.getData()));

            const equipment: { pos: number; item: Item }[] = [];
            player.inventory.getItemSlots().forEach((slot, index) => {
                switch (index) {
                    case 5: {
                        if (!slot.present) return;
                        equipment.push({ pos: 5, item: slot });
                        break;
                    }
                    case 6: {
                        if (!slot.present) return;
                        equipment.push({ pos: 4, item: slot });
                        break;
                    }
                    case 7: {
                        if (!slot.present) return;
                        equipment.push({ pos: 3, item: slot });
                        break;
                    }
                    case 8: {
                        if (!slot.present) return;
                        equipment.push({ pos: 2, item: slot });
                        break;
                    }
                    case 45: {
                        if (!slot.present) return;
                        equipment.push({ pos: 1, item: slot });
                        break;
                    }
                    case player.inventory.selectedHand + 36: {
                        if (!slot.present) return;
                        equipment.push({ pos: 0, item: slot });
                        break;
                    }
                }
            });
            if (equipment.length > 0) gamelistener.send(new ClientBoundSetEquipmentPacket(player.id, equipment));
        });

        gamelistener.send(new ClientBoundSetDefaultSpawnPositionPacket(new BlockPos(0, -60, 0), 0));

        gamelistener.send(
            new ClientBoundContainerSetContentPacket(0, 0, gamelistener.player.inventory.getItemSlots(), Item.Empty),
        );

        gamelistener.send(new ClientBoundSetCarriedItemPacket(gamelistener.player.inventory.selectedHand));
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
            inventory: [],
            selectedSlot: 0,
        };
    }

    public savePlayer(conn: Connection): Promise<void> {
        return new Promise(resolve => {
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
                inventory: player.inventory.toNBT(),
                selectedSlot: player.inventory.selectedHand + 'b',
            };
            mkdir(join(__dirname, '../../world/players'), { recursive: true }).then(_path => {
                writeFile(
                    join(__dirname, '../../world/players', player.gameProfile.id?.toString()! + '.nbt'),
                    objectToNbt(data),
                ).then(() => resolve());
            });
        });
    }
}
