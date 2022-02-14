import { randomBytes } from 'node:crypto';
import type BarrierTs from '../BarrierTs';
import BlockPos from '../types/classes/BlockPos';
import Chat, { ChatType } from '../types/classes/Chat';
import Item from '../types/classes/Item';
import { ChatPermission } from '../types/enums/ChatPermission';
import { Direction } from '../types/enums/Direction';
import { InteractionHand } from '../types/enums/InteractionHand';
import Vector2 from '../utilitys/Vector2';
import Vector3 from '../utilitys/Vector3';
import type Player from '../world/entities/Player';
import type Connection from './Connection';
import type PacketListener from './PacketListener';
import type ClientBoundPacket from './protocol/ClientBoundPacket';
import ClientBoundAnimatePacket, { Action as SwingAction } from './protocol/game/ClientBoundAnimatePacket';
import ClientBoundBlockUpdatePacket from './protocol/game/ClientBoundBlockUpdatePacket';
import ClientBoundChatPacket from './protocol/game/ClientBoundChatPacket';
import ClientBoundKeepAlivePacket from './protocol/game/ClientBoundKeepAlivePacket';
import ClientBoundLevelEventPacket from './protocol/game/ClientBoundLevelEventPacket';
import ClientBoundMoveEntityPacketPos from './protocol/game/ClientBoundMoveEntityPosPacket';
import ClientBoundMoveEntityPacketPosRot from './protocol/game/ClientBoundMoveEntityPosRotPacket';
import ClientBoundMoveEntityPacketRot from './protocol/game/ClientBoundMoveEntityRotPacket';
import ClientBoundPlayerPositionPacket from './protocol/game/ClientBoundPlayerPositionPacket';
import ClientBoundRotateHeadPacket from './protocol/game/ClientBoundRotateHeadPacket';
import ClientBoundSetChunkCacheCenterPacket from './protocol/game/ClientBoundSetChunkCacheCenterPacket';
import ClientBoundSetEquipmentPacket from './protocol/game/ClientBoundSetEquipmentPacket';
import ClientBoundTeleportEntityPacket from './protocol/game/ClientBoundTeleportEntityPacket';
import type ServerBoundAcceptTeleportationPacket from './protocol/game/ServerBoundAcceptTeleportationPacket';
import type ServerBoundBlockEntityTagQuery from './protocol/game/ServerBoundBlockEntityTagQuery';
import type ServerBoundChangeDifficultyPacket from './protocol/game/ServerBoundChangeDifficultyPacket';
import type ServerBoundChatPacket from './protocol/game/ServerBoundChatPacket';
import type ServerBoundClientCommandPacket from './protocol/game/ServerBoundClientCommandPacket';
import type ServerBoundClientInformationPacket from './protocol/game/ServerBoundClientInformationPacket';
import type ServerBoundCommandSuggestionPacket from './protocol/game/ServerBoundCommandSuggestionPacket';
import type ServerBoundContainerButtonClickPacket from './protocol/game/ServerBoundContainerButtonClickPacket';
import type ServerBoundContainerClickPacket from './protocol/game/ServerBoundContainerClickPacket';
import type ServerBoundContainerClosePacket from './protocol/game/ServerBoundContainerClosePacket';
import type ServerBoundCustomPayloadPacket from './protocol/game/ServerBoundCustomPayloadPacket';
import type ServerBoundEditBookPacket from './protocol/game/ServerBoundEditBookPacket';
import type ServerBoundEntityTagQuery from './protocol/game/ServerBoundEntityTagQuery';
import type ServerBoundInteractPacket from './protocol/game/ServerBoundInteractPacket';
import type ServerBoundJigsawGeneratePacket from './protocol/game/ServerBoundJigsawGeneratePacket';
import type ServerBoundKeepAlivePacket from './protocol/game/ServerBoundKeepAlivePacket';
import type ServerBoundLockDifficultyPacket from './protocol/game/ServerBoundLockDifficultyPacket';
import type ServerBoundMovePlayerPosPacket from './protocol/game/ServerBoundMovePlayerPosPacket';
import type ServerBoundMovePlayerPosRotPacket from './protocol/game/ServerBoundMovePlayerPosRotPacket';
import type ServerBoundMovePlayerRotPacket from './protocol/game/ServerBoundMovePlayerRotPacket';
import type ServerBoundMovePlayerStatusOnlyPacket from './protocol/game/ServerBoundMovePlayerStatusOnlyPacket';
import type ServerBoundMoveVehiclePacket from './protocol/game/ServerBoundMoveVehiclePacket';
import type ServerBoundPaddleBoatPacket from './protocol/game/ServerBoundPaddleBoatPacket';
import type ServerBoundPickItemPacket from './protocol/game/ServerBoundPickItemPacket';
import type ServerBoundPlaceRecipePacket from './protocol/game/ServerBoundPlaceRecipePacket';
import type ServerBoundPlayerAbilitiesPacket from './protocol/game/ServerBoundPlayerAbilitiesPacket';
import type ServerBoundPlayerActionPacket from './protocol/game/ServerBoundPlayerActionPacket';
import type ServerBoundPlayerCommandPacket from './protocol/game/ServerBoundPlayerCommandPacket';
import { Action as PlayerCommandAction } from './protocol/game/ServerBoundPlayerCommandPacket';
import type ServerBoundPlayerInputPacket from './protocol/game/ServerBoundPlayerInputPacket';
import type ServerBoundPongPacket from './protocol/game/ServerBoundPongPacket';
import type ServerBoundRecipeBookChangeSettingsPacket from './protocol/game/ServerBoundRecipeBookChangeSettingsPacket';
import type ServerBoundRecipeBookSeenRecipePacket from './protocol/game/ServerBoundRecipeBookSeenRecipePacket';
import type ServerBoundRenameItemPacket from './protocol/game/ServerBoundRenameItemPacket';
import type ServerBoundResourcePackPacket from './protocol/game/ServerBoundResourcePackPacket';
import type ServerBoundSeenAdvancementsPacket from './protocol/game/ServerBoundSeenAdvancementsPacket';
import type ServerBoundSelectTradePacket from './protocol/game/ServerBoundSelectTradePacket';
import type ServerBoundSetBeaconPacket from './protocol/game/ServerBoundSetBeaconPacket';
import type ServerBoundSetCarriedItemPacket from './protocol/game/ServerBoundSetCarriedItemPacket';
import type ServerBoundSetCommandBlockPacket from './protocol/game/ServerBoundSetCommandBlockPacket';
import type ServerBoundSetCommandMinecartPacket from './protocol/game/ServerBoundSetCommandMinecartPacket';
import type ServerBoundSetCreativeModeSlotPacket from './protocol/game/ServerBoundSetCreativeModeSlotPacket';
import type ServerBoundSetJigsawBlockPacket from './protocol/game/ServerBoundSetJigsawBlockPacket';
import type ServerBoundSetStructureBlockPacket from './protocol/game/ServerBoundSetStructureBlockPacket';
import type ServerBoundSignUpdatePacket from './protocol/game/ServerBoundSignUpdatePacket';
import type ServerBoundSwingPacket from './protocol/game/ServerBoundSwingPacket';
import type ServerBoundTeleportToEntityPacket from './protocol/game/ServerBoundTeleportToEntityPacket';
import type ServerBoundUseItemOnPacket from './protocol/game/ServerBoundUseItemOnPacket';
import type ServerBoundUseItemPacket from './protocol/game/ServerBoundUseItemPacket';

export default class GamePacketListener implements PacketListener {
    private keepAlive = Date.now();
    private keepAlivePending = false;
    private teleportId = randomBytes(4);
    private previousPosition = Vector3.ZERO;
    private previousRotation = Vector2.ZERO;
    private previousChunkX = 0;
    private previousChunkZ = 0;

    public constructor(
        public readonly server: BarrierTs,
        public readonly player: Player,
        public readonly connection: Connection,
    ) {}

    public tick(): void {
        const timeNow = Date.now();
        if (timeNow - this.keepAlive >= 15000) {
            if (this.keepAlivePending) {
                this.connection.disconnect(new Chat(ChatType.TRANSLATE, 'disconnect.timeout'));
            } else {
                this.keepAlivePending = true;
                this.keepAlive = timeNow;
                this.connection.send(new ClientBoundKeepAlivePacket(BigInt(timeNow)));
            }
        }

        if (
            this.player.pos.x !== this.previousPosition.x ||
            this.player.pos.y !== this.previousPosition.y ||
            this.player.pos.z !== this.previousPosition.z
        ) {
            if (this.player.rot.x !== this.previousRotation.x || this.player.rot.y !== this.previousRotation.y) {
                this.server.playerManager.sendAll(
                    new ClientBoundMoveEntityPacketPosRot(
                        this.player.id,
                        (this.player.pos.x * 32 - this.previousPosition.x * 32) * 128,
                        (this.player.pos.y * 32 - this.previousPosition.y * 32) * 128,
                        (this.player.pos.z * 32 - this.previousPosition.z * 32) * 128,
                        Math.floor((this.player.rot.y * 256) / 360),
                        Math.floor((this.player.rot.x * 256) / 360),
                        this.player.isOnGround,
                    ),
                    this.player.id,
                );
                this.server.playerManager.sendAll(
                    new ClientBoundRotateHeadPacket(this.player.id, Math.floor((this.player.rot.y * 256) / 360)),
                    this.player.id,
                );
                this.previousPosition = this.player.pos;
                this.previousRotation = this.player.rot;
            } else {
                this.server.playerManager.sendAll(
                    new ClientBoundMoveEntityPacketPos(
                        this.player.id,
                        (this.player.pos.x * 32 - this.previousPosition.x * 32) * 128,
                        (this.player.pos.y * 32 - this.previousPosition.y * 32) * 128,
                        (this.player.pos.z * 32 - this.previousPosition.z * 32) * 128,
                        this.player.isOnGround,
                    ),
                    this.player.id,
                );
                this.previousPosition = this.player.pos;
            }
        } else if (this.player.rot.x !== this.previousRotation.x || this.player.rot.y !== this.previousRotation.y) {
            this.server.playerManager.sendAll(
                new ClientBoundMoveEntityPacketRot(
                    this.player.id,
                    Math.floor((this.player.rot.y * 256) / 360),
                    Math.floor((this.player.rot.x * 256) / 360),
                    this.player.isOnGround,
                ),
                this.player.id,
            );
            this.server.playerManager.sendAll(
                new ClientBoundRotateHeadPacket(this.player.id, Math.floor((this.player.rot.y * 256) / 360)),
                this.player.id,
            );
            this.previousRotation = this.player.rot;
        }

        const currentChunkX = this.player.pos.x >> 4;
        const currentChunkZ = this.player.pos.z >> 4;

        if (currentChunkX !== this.previousChunkX || currentChunkZ !== this.previousChunkZ) {
            this.send(new ClientBoundSetChunkCacheCenterPacket(currentChunkX, currentChunkZ));

            if (currentChunkX > this.previousChunkX) {
            }

            if (currentChunkX < this.previousChunkX) {
            }

            if (currentChunkZ > this.previousChunkZ) {
            }

            if (currentChunkZ < this.previousChunkZ) {
            }

            this.previousChunkX = currentChunkX;
            this.previousChunkZ = currentChunkZ;
        }
    }

    public send(packet: ClientBoundPacket): void {
        this.connection.send(packet);
    }

    public teleport(x: number, y: number, z: number, yRot: number, xRot: number): void {
        this.player.updatePostion({ x, y, z, rotY: yRot, rotX: xRot, onGround: false });
        this.previousPosition = new Vector3(x, y, z);
        this.previousRotation = new Vector2(xRot, yRot);
        this.previousChunkX = x >> 4;
        this.previousChunkZ = z >> 4;
        this.send(
            new ClientBoundPlayerPositionPacket(
                x,
                y,
                z,
                yRot,
                xRot,
                0,
                this.teleportId.readInt32BE(),
                this.player.isOnGround,
            ),
        );
        this.server.playerManager.sendAll(
            new ClientBoundTeleportEntityPacket(
                this.player.id,
                x,
                y,
                z,
                Math.floor((yRot * 256) / 360),
                Math.floor((xRot * 256) / 360),
                true,
            ),
            this.player.id,
        );
    }

    public handleAcceptTeleport(acceptTeleport: ServerBoundAcceptTeleportationPacket): void {
        if (acceptTeleport.id !== this.teleportId.readInt32BE())
            return this.server.console.warn('Player invalid teleport id!');
        this.teleportId = randomBytes(4);
    }

    public handleBlockEntityTagQuery(_blockEntityTagQuery: ServerBoundBlockEntityTagQuery): void {
        throw new Error('Method not implemented.');
    }

    public handleChangeDifficulty(_changeDifficulty: ServerBoundChangeDifficultyPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleChat(chat: ServerBoundChatPacket): void {
        if (chat.message.startsWith('/')) {
            // TODO: handle commands properly on the server then implement this
            this.send(
                new ClientBoundChatPacket(
                    new Chat(ChatType.TEXT, 'TODO'),
                    ChatPermission.SYSTEM,
                    this.player.gameProfile.id,
                ),
            );
            return;
        }

        this.server.console.log('<%s> %s', this.player.gameProfile.name, chat.message);
        this.server.playerManager.sendAll(
            new ClientBoundChatPacket(
                new Chat(ChatType.TRANSLATE, 'chat.type.text', {
                    with: [
                        {
                            text: this.player.gameProfile.name,
                            insertion: this.player.gameProfile.name,
                            clickEvent: {
                                action: 'suggest_command',
                                value: `/tell ${this.player.gameProfile.name} `,
                            },
                            hoverEvent: {
                                action: 'show_entity',
                                contents: {
                                    type: 'minecraft:player',
                                    id: this.player.gameProfile.id.toFormatedString(),
                                    name: { text: this.player.gameProfile.name },
                                },
                            },
                        },
                        chat.message,
                    ],
                }),
                ChatPermission.CHAT,
                this.player.gameProfile.id,
            ),
        );
    }

    public handleClientCommand(_clientCommand: ServerBoundClientCommandPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleClientInformation(clientInformation: ServerBoundClientInformationPacket): void {
        this.player.updateOptions(clientInformation);
    }

    public handleCommandSuggestions(_CommandSuggestions: ServerBoundCommandSuggestionPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleContainerButtonClick(_containerButtonClick: ServerBoundContainerButtonClickPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleContainerClick(_containerClick: ServerBoundContainerClickPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleContainerClose(_containerClose: ServerBoundContainerClosePacket): void {
        // This can probly be a event for plugins
    }

    public handleCustomPayload(_customPayload: ServerBoundCustomPayloadPacket): void {}

    public handleEditBook(_editBook: ServerBoundEditBookPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleEntityTagQuery(_entityTagQuery: ServerBoundEntityTagQuery): void {
        throw new Error('Method not implemented.');
    }

    public handleInteract(_interact: ServerBoundInteractPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleJigsawGenerate(_jigsawGenerate: ServerBoundJigsawGeneratePacket): void {
        throw new Error('Method not implemented.');
    }

    public handleKeepAlive(keepAlive: ServerBoundKeepAlivePacket): void {
        if (this.keepAlivePending && keepAlive.id === BigInt(this.keepAlive)) {
            this.keepAlivePending = false;
            return;
        }
        this.connection.disconnect(new Chat(ChatType.TRANSLATE, 'disconnect.timeout'));
    }

    public handleLockDifficulty(_lockDifficulty: ServerBoundLockDifficultyPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleMovePlayerPos(movePlayerPos: ServerBoundMovePlayerPosPacket): void {
        this.player.updatePostion({
            x: movePlayerPos.x,
            y: movePlayerPos.y,
            z: movePlayerPos.z,
            onGround: movePlayerPos.onGround,
        });
    }

    public handleMovePlayerPosRot(movePlayerPosRot: ServerBoundMovePlayerPosRotPacket): void {
        this.player.updatePostion({
            x: movePlayerPosRot.x,
            y: movePlayerPosRot.y,
            z: movePlayerPosRot.z,
            rotY: movePlayerPosRot.yRot,
            rotX: movePlayerPosRot.xRot,
            onGround: movePlayerPosRot.onGround,
        });
    }

    public handleMovePlayerRot(movePlayerRot: ServerBoundMovePlayerRotPacket): void {
        this.player.updatePostion({
            rotY: movePlayerRot.yRot,
            rotX: movePlayerRot.xRot,
            onGround: movePlayerRot.onGround,
        });
    }

    public handleMovePlayerStatusOnly(movePlayerStatusOnly: ServerBoundMovePlayerStatusOnlyPacket): void {
        this.player.updatePostion({ onGround: movePlayerStatusOnly.onGround });
        this.server.playerManager.sendAll(
            new ClientBoundTeleportEntityPacket(
                this.player.id,
                this.player.pos.x,
                this.player.pos.y,
                this.player.pos.z,
                Math.floor((this.player.rot.y * 256) / 360),
                Math.floor((this.player.rot.x * 256) / 360),
                movePlayerStatusOnly.onGround,
            ),
            this.player.id,
        );
    }

    public handleMoveVehicle(_moveVehicle: ServerBoundMoveVehiclePacket): void {
        throw new Error('Method not implemented.');
    }

    public handlePaddleBoat(_paddleBoat: ServerBoundPaddleBoatPacket): void {
        throw new Error('Method not implemented.');
    }

    public handlePickItem(_pickItem: ServerBoundPickItemPacket): void {
        throw new Error('Method not implemented.');
    }

    public handlePlaceRecipe(_placeRecipe: ServerBoundPlaceRecipePacket): void {
        throw new Error('Method not implemented.');
    }

    public handlePlayerAbilities(playerAbilities: ServerBoundPlayerAbilitiesPacket): void {
        this.player.isFlying = playerAbilities.isFlying;
    }

    public handlePlayerAction(playerAction: ServerBoundPlayerActionPacket): void {
        this.server.world.removeBlock(playerAction.pos.x, playerAction.pos.y, playerAction.pos.z);
        this.server.playerManager.sendAll(new ClientBoundBlockUpdatePacket(playerAction.pos, 0), this.player.id);
        this.server.playerManager.sendAll(
            new ClientBoundLevelEventPacket(2001, playerAction.pos, 1, false),
            this.player.id,
        );
    }

    public handlePlayerCommand(playerCommand: ServerBoundPlayerCommandPacket): void {
        switch (playerCommand.action) {
            case PlayerCommandAction.PRESS_SHIFT_KEY: {
                this.player.isCrouching = true;
                break;
            }

            case PlayerCommandAction.RELEASE_SHIFT_KEY: {
                this.player.isCrouching = false;
                break;
            }

            case PlayerCommandAction.START_SPRINTING: {
                this.player.isSprinting = true;
                break;
            }

            case PlayerCommandAction.STOP_SPRINTING: {
                this.player.isSprinting = false;
                break;
            }

            default: {
                throw new Error(`Need to handle action ${playerCommand.action}`);
            }
        }
    }

    public handlePlayerInput(_playerInput: ServerBoundPlayerInputPacket): void {
        throw new Error('Method not implemented.');
    }

    public handlePong(_pong: ServerBoundPongPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleRecipeBookChangeSettingsPacket(
        _recipeBookChangeSettingsPacket: ServerBoundRecipeBookChangeSettingsPacket,
    ): void {
        throw new Error('Method not implemented.');
    }

    public handleRecipeBookSeenRecipe(_recipeBookSeenRecipe: ServerBoundRecipeBookSeenRecipePacket): void {
        throw new Error('Method not implemented.');
    }

    public handleRenameItem(_renameItem: ServerBoundRenameItemPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleResourcePack(_resourcePack: ServerBoundResourcePackPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleSeenAdvancements(_seenAdvancements: ServerBoundSeenAdvancementsPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleSelectTrade(_selectTrade: ServerBoundSelectTradePacket): void {
        throw new Error('Method not implemented.');
    }

    public handleSetBeacon(_setBeaconPacket: ServerBoundSetBeaconPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleSetCarriedItem(setCarriedItem: ServerBoundSetCarriedItemPacket): void {
        this.player.inventory.selectedHand = setCarriedItem.slot;

        const item = this.player.inventory.getSlot(36 + setCarriedItem.slot);

        this.server.playerManager.sendAll(
            new ClientBoundSetEquipmentPacket(this.player.id, [{ pos: 0, item: item ? item : Item.Empty }]),
            this.player.id,
        );
    }

    public handleSetCommandBlock(_setCommandBlock: ServerBoundSetCommandBlockPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleSetCommandMinecart(_setCommandMinecart: ServerBoundSetCommandMinecartPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleSetCreativeModeSlot(setCreativeModeSlot: ServerBoundSetCreativeModeSlotPacket): void {
        this.player.inventory.setSlot(setCreativeModeSlot.slotNum, setCreativeModeSlot.itemStack);
    }

    public handleSetJigsawBlock(_setJigsawBlock: ServerBoundSetJigsawBlockPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleSetStructureBlock(_setStructureBlock: ServerBoundSetStructureBlockPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleSignUpdate(_signUpdate: ServerBoundSignUpdatePacket): void {
        throw new Error('Method not implemented.');
    }

    public handleSwing(swing: ServerBoundSwingPacket): void {
        this.server.playerManager.sendAll(
            new ClientBoundAnimatePacket(
                this.player.id,
                swing.hand === InteractionHand.MAIN_HAND ? SwingAction.SWING_MAIN_HAND : SwingAction.SWING_OFF_HAND,
            ),
            this.player.id,
        );
    }

    public handleTeleportToEntity(_teleportToEntity: ServerBoundTeleportToEntityPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleUseItem(_useItem: ServerBoundUseItemPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleUseItemOn(useItemOn: ServerBoundUseItemOnPacket): void {
        switch (useItemOn.direction) {
            case Direction.UP: {
                const newBlock = new BlockPos(useItemOn.blockPos.x, useItemOn.blockPos.y + 1, useItemOn.blockPos.z);
                this.server.world.setBlock(newBlock.x, newBlock.y, newBlock.z, 1);
                this.server.playerManager.sendAll(new ClientBoundBlockUpdatePacket(newBlock, 1));
                break;
            }

            case Direction.DOWN: {
                const newBlock = new BlockPos(useItemOn.blockPos.x, useItemOn.blockPos.y - 1, useItemOn.blockPos.z);
                this.server.world.setBlock(newBlock.x, newBlock.y, newBlock.z, 1);
                this.server.playerManager.sendAll(new ClientBoundBlockUpdatePacket(newBlock, 1));
                break;
            }

            case Direction.NORTH: {
                const newBlock = new BlockPos(useItemOn.blockPos.x, useItemOn.blockPos.y, useItemOn.blockPos.z - 1);
                this.server.world.setBlock(newBlock.x, newBlock.y, newBlock.z, 1);
                this.server.playerManager.sendAll(new ClientBoundBlockUpdatePacket(newBlock, 1));
                break;
            }

            case Direction.SOUTH: {
                const newBlock = new BlockPos(useItemOn.blockPos.x, useItemOn.blockPos.y, useItemOn.blockPos.z + 1);
                this.server.world.setBlock(newBlock.x, newBlock.y, newBlock.z, 1);
                this.server.playerManager.sendAll(new ClientBoundBlockUpdatePacket(newBlock, 1));
                break;
            }

            case Direction.EAST: {
                const newBlock = new BlockPos(useItemOn.blockPos.x + 1, useItemOn.blockPos.y, useItemOn.blockPos.z);
                this.server.world.setBlock(newBlock.x, newBlock.y, newBlock.z, 1);
                this.server.playerManager.sendAll(new ClientBoundBlockUpdatePacket(newBlock, 1));
                break;
            }

            case Direction.WEST: {
                const newBlock = new BlockPos(useItemOn.blockPos.x - 1, useItemOn.blockPos.y, useItemOn.blockPos.z);
                this.server.world.setBlock(newBlock.x, newBlock.y, newBlock.z, 1);
                this.server.playerManager.sendAll(new ClientBoundBlockUpdatePacket(newBlock, 1));
                break;
            }
        }
    }
}
