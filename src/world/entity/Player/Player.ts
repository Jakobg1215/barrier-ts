import { randomUUID } from 'node:crypto';
import type Connection from '../../../networking/Connection';
import ClientboundAddPlayerPacket from '../../../networking/packets/game/ClientboundAddPlayerPacket';
import ClientboundChangeDifficultyPacket from '../../../networking/packets/game/ClientboundChangeDifficultyPacket';
import ClientboundCustomPayloadPacket from '../../../networking/packets/game/ClientboundCustomPayloadPacket';
import ClientboundLevelChunkWithLightPacket from '../../../networking/packets/game/ClientboundLevelChunkWithLightPacket';
import ClientboundLoginPacket from '../../../networking/packets/game/ClientboundLoginPacket';
import ClientboundPlayerAbilitiesPacket from '../../../networking/packets/game/ClientboundPlayerAbilitiesPacket';
import ClientboundPlayerInfoPacket from '../../../networking/packets/game/ClientboundPlayerInfoPacket';
import ClientboundPlayerPositionPacket from '../../../networking/packets/game/ClientboundPlayerPositionPacket';
import ClientboundSetCarriedItemPacket from '../../../networking/packets/game/ClientboundSetCarriedItemPacket';
import ClientboundSetChunkCacheCenterPacket from '../../../networking/packets/game/ClientboundSetChunkCacheCenterPacket';
import ClientboundSetDefaultSpawnPositionPacket from '../../../networking/packets/game/ClientboundSetDefaultSpawnPositionPacket';
import type ClientboundSetEntityDataPacket from '../../../networking/packets/game/ClientboundSetEntityDataPacket';
import ClientboundGameProfilePacket from '../../../networking/packets/login/ClientboundGameProfilePacket';
import Packet from '../../../networking/packets/Packet';
import { ProtocolState } from '../../../networking/Protocol';
import BlockPos from '../../../types/classes/BlockPos';
import DimensionType from '../../../types/DimensionType';
import { Difficulty } from '../../../types/enums/Difficulty';
import { GameType } from '../../../types/enums/GameType';
import { Hand } from '../../../types/enums/Hand';
import type GameProfile from '../../../types/GameProfile';
import RegistryHolder from '../../../types/RegistryHolder';
import objectToNbt from '../../../utilities/objectToNbt';
import LivingEntity from '../LivingEntity';

export default class Player extends LivingEntity {
    public playerGameProfile: GameProfile = {
        name: 'OfflinePlayer:',
        uuid: randomUUID(),
        properties: [],
        legacy: false,
    };
    public absorption = 0;
    public score = 0;
    public customisation = 0;
    public mainHand = Hand.MAIN_HAND;
    public heldItemSlot = 0;
    public isflowting = false;

    public constructor(public readonly connection: Connection) {
        super();
    }

    public override updataMetaData(): ClientboundSetEntityDataPacket {
        const prepacket = super.updataMetaData();
        prepacket.packedItems.push(
            { type: 2, index: 15, value: this.absorption },
            { type: 1, index: 16, value: this.score },
            { type: 0, index: 17, value: this.customisation },
            { type: 0, index: 18, value: this.mainHand },
        );
        return prepacket;
    }

    public login() {
        this.connection.send(new ClientboundGameProfilePacket(this.playerGameProfile));
        this.connection.protocolState = ProtocolState.PLAY;

        this.connection.send(
            new ClientboundLoginPacket(
                this.id,
                0n,
                false,
                GameType.CREATIVE,
                GameType.CREATIVE,
                ['minecraft:overworld', 'minecraft:the_nether', 'minecraft:the_end'],
                objectToNbt(RegistryHolder),
                objectToNbt(DimensionType),
                'minecraft:overworld',
                this.connection.server.config.maxplayers,
                8,
                8,
                false,
                true,
                false,
                true,
            ),
        );

        this.connection.send(
            new ClientboundCustomPayloadPacket(
                'minecraft:brand',
                new Packet().writeString(this.connection.server.config.serverName).getReadableBytes(),
            ),
        );
        this.connection.send(new ClientboundChangeDifficultyPacket(Difficulty.NORMAL, true));
        this.connection.send(new ClientboundPlayerAbilitiesPacket(true, this.isflowting, true, true, 0.05, 0.1));
        this.connection.send(
            new ClientboundPlayerInfoPacket(
                0,
                this.connection.server.playerManager.getOnlinePlayers().map(player => {
                    return {
                        latency: 0,
                        gameMode: GameType.CREATIVE,
                        profile: player.playerGameProfile,
                        displayName: player.name,
                    };
                }),
            ),
        );
        this.connection.server.playerManager.sendAll(
            new ClientboundPlayerInfoPacket(0, [
                {
                    latency: 0,
                    gameMode: GameType.CREATIVE,
                    profile: this.playerGameProfile,
                    displayName: this.name,
                },
            ]),
            this.id,
        );
        this.connection.server.playerManager.getOnlinePlayers().forEach(player => {
            if (player.id === this.id) return;
            this.connection.send(
                new ClientboundAddPlayerPacket(
                    player.id,
                    player.playerGameProfile.uuid,
                    player.position.x,
                    player.position.y,
                    player.position.z,
                    (player.rotation.y * 256) / 360,
                    (player.rotation.x * 256) / 360,
                ),
            );
        });
        this.connection.server.playerManager.sendAll(
            new ClientboundAddPlayerPacket(
                this.id,
                this.playerGameProfile.uuid,
                this.position.x,
                this.position.y,
                this.position.z,
                (this.rotation.y * 256) / 360,
                (this.rotation.x * 256) / 360,
            ),
            this.id,
        );
        this.connection.send(new ClientboundSetChunkCacheCenterPacket(0, 0));

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
                this.connection.send(
                    new ClientboundLevelChunkWithLightPacket(
                        x,
                        z,
                        objectToNbt({}),
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
        this.connection.send(new ClientboundSetDefaultSpawnPositionPacket(new BlockPos(0, -60, 0), 0));
        this.connection.send(new ClientboundPlayerPositionPacket(0.5, -60, 0.5, 0, 0, 0, 0, false)); // this should be the last packet for initialisation

        this.connection.send(new ClientboundSetCarriedItemPacket(this.heldItemSlot));

        this.connection.server.console.log(`Player ${this.playerGameProfile.name} has joined the game!`);
    }
}
