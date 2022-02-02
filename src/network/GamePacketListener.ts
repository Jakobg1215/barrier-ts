import type BarrierTs from '../BarrierTs';
import Chat, { ChatType } from '../types/classes/Chat';
import type Player from '../world/entities/Player';
import type Connection from './Connection';
import type PacketListener from './PacketListener';
import type ClientBoundPacket from './protocol/ClientBoundPacket';
import ClientBoundKeepAlivePacket from './protocol/game/ClientBoundKeepAlivePacket';
import ClientBoundPlayerPositionPacket from './protocol/game/ClientBoundPlayerPositionPacket';
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
    }

    public send(packet: ClientBoundPacket): void {
        this.connection.send(packet);
    }

    public teleport(x: number, y: number, z: number, yRot: number, xRot: number): void {
        this.player.updatePos(x, y, z);
        this.connection.send(new ClientBoundPlayerPositionPacket(x, y, z, yRot, xRot, 0, 0, false));
    }

    public handleAcceptTeleport(_acceptTeleport: ServerBoundAcceptTeleportationPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleBlockEntityTagQuery(_blockEntityTagQuery: ServerBoundBlockEntityTagQuery): void {
        throw new Error('Method not implemented.');
    }

    public handleChangeDifficulty(_changeDifficulty: ServerBoundChangeDifficultyPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleChat(_chat: ServerBoundChatPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleClientCommand(_clientCommand: ServerBoundClientCommandPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleClientInformation(_clientInformation: ServerBoundClientInformationPacket): void {
        throw new Error('Method not implemented.');
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
        throw new Error('Method not implemented.');
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
        this.player.movePos(movePlayerPos.x, movePlayerPos.y, movePlayerPos.z, movePlayerPos.onGround);
    }

    public handleMovePlayerPosRot(movePlayerPosRot: ServerBoundMovePlayerPosRotPacket): void {
        this.player.moveRotate(
            movePlayerPosRot.x,
            movePlayerPosRot.y,
            movePlayerPosRot.z,
            movePlayerPosRot.yRot,
            movePlayerPosRot.xRot,
            movePlayerPosRot.onGround,
        );
    }

    public handleMovePlayerRot(movePlayerRot: ServerBoundMovePlayerRotPacket): void {
        this.player.rotateTo(movePlayerRot.yRot, movePlayerRot.xRot, movePlayerRot.onGround);
    }

    public handleMovePlayerStatusOnly(_movePlayerStatusOnly: ServerBoundMovePlayerStatusOnlyPacket): void {
        throw new Error('Method not implemented.');
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

    public handlePlayerAction(_playerAction: ServerBoundPlayerActionPacket): void {
        throw new Error('Method not implemented.');
    }

    public handlePlayerCommand(_playerCommand: ServerBoundPlayerCommandPacket): void {
        throw new Error('Method not implemented.');
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

    public handleSetCarriedItem(_setCarriedItem: ServerBoundSetCarriedItemPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleSetCommandBlock(_setCommandBlock: ServerBoundSetCommandBlockPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleSetCommandMinecart(_setCommandMinecart: ServerBoundSetCommandMinecartPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleSetCreativeModeSlot(_setCreativeModeSlot: ServerBoundSetCreativeModeSlotPacket): void {
        throw new Error('Method not implemented.');
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

    public handleSwing(_swing: ServerBoundSwingPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleTeleportToEntity(_teleportToEntity: ServerBoundTeleportToEntityPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleUseItem(_useItem: ServerBoundUseItemPacket): void {
        throw new Error('Method not implemented.');
    }

    public handleUseItemOn(_useItemOn: ServerBoundUseItemOnPacket): void {
        throw new Error('Method not implemented.');
    }
}
