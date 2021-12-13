import AcceptTeleportationHandler from './handlers/game/AcceptTeleportationHandler';
import BlockEntityTagQueryHandler from './handlers/game/BlockEntityTagQueryHandler';
import ChangeDifficultyHandler from './handlers/game/ChangeDifficultyHandler';
import ChatHandler from './handlers/game/ChatHandler';
import ClientCommandHandler from './handlers/game/ClientCommandHandler';
import ClientInformationHandler from './handlers/game/ClientInformationHandler';
import CommandSuggestionHandler from './handlers/game/CommandSuggestionHandler';
import ContainerButtonClickHandler from './handlers/game/ContainerButtonClickHandler';
import ContainerClickHandler from './handlers/game/ContainerClickHandler';
import ContainerCloseHandler from './handlers/game/ContainerCloseHandler';
import CustomPayloadHandler from './handlers/game/CustomPayloadHandler';
import EditBookHandler from './handlers/game/EditBookHandler';
import EntityTagQueryHandler from './handlers/game/EntityTagQueryHandler';
import InteractHandler from './handlers/game/InteractHandler';
import JigsawGenerateHandler from './handlers/game/JigsawGenerateHandler';
import KeepAliveHandler from './handlers/game/KeepAliveHandler';
import LockDifficultyHandler from './handlers/game/LockDifficultyHandler';
import MovePlayerPosHandler from './handlers/game/MovePlayerPosHandler';
import MovePlayerPosRotHandler from './handlers/game/MovePlayerPosRotHandler';
import MovePlayerRotHandler from './handlers/game/MovePlayerRotHandler';
import MovePlayerStatusOnlyHandler from './handlers/game/MovePlayerStatusOnlyHandler';
import MoveVehicleHandler from './handlers/game/MoveVehicleHandler';
import PaddleBoatHandler from './handlers/game/PaddleBoatHandler';
import PickItemHandler from './handlers/game/PickItemHandler';
import PlaceRecipeHandler from './handlers/game/PlaceRecipeHandler';
import PlayerAbilitiesHandler from './handlers/game/PlayerAbilitiesHandler';
import PlayerActionHandler from './handlers/game/PlayerActionHandler';
import PlayerCommandHandler from './handlers/game/PlayerCommandHandler';
import PlayerInputHandler from './handlers/game/PlayerInputHandler';
import PongHandler from './handlers/game/PongHandler';
import RecipeBookChangeSettingsHandler from './handlers/game/RecipeBookChangeSettingsHandler';
import RecipeBookSeenRecipeHandler from './handlers/game/RecipeBookSeenRecipeHandler';
import RenameItemHandler from './handlers/game/RenameItemHandler';
import ResourcePackHandler from './handlers/game/ResourcePack';
import SeenAdvancementsHandler from './handlers/game/SeenAdvancementsHandler';
import SelectTradeHandler from './handlers/game/SelectTradeHandler';
import SetBeaconHandler from './handlers/game/SetBeaconHandler';
import SetCarriedItemHandler from './handlers/game/SetCarriedItemHandler';
import SetCommandBlockHandler from './handlers/game/SetCommandBlockHandler';
import SetCommandMinecartHandler from './handlers/game/SetCommandMinecartHandler';
import SetCreativeModeSlotHandler from './handlers/game/SetCreativeModeSlotHandler';
import SetJigsawBlockHandler from './handlers/game/SetJigsawBlockHandler';
import SetStructureBlockHandler from './handlers/game/SetStructureBlockHandler';
import SignUpdateHandler from './handlers/game/SignUpdateHandler';
import SwingHandler from './handlers/game/SwingHandler';
import TeleportToEntityHandler from './handlers/game/TeleportToEntityHandler';
import UseItemHandler from './handlers/game/UseItemHandler';
import UseItemOnHandler from './handlers/game/UseItemOnHandler';
import type Handler from './handlers/Handler';
import ClientIntentionHandler from './handlers/handshake/ClientIntentionHandler';
import CustomQueryHandler from './handlers/login/CustomQueryHandler';
import HelloHandler from './handlers/login/HelloHandler';
import KeyHandler from './handlers/login/KeyHandler';
import PingRequestHandler from './handlers/status/PingRequestHandler';
import StatusRequestHandler from './handlers/status/StatusRequestHandler';
import type ClientboundPacket from './packets/ClientbountPacket';
import ClientboundAddEntityPacket from './packets/game/ClientboundAddEntityPacket';
import ClientboundAddExperienceOrbPacket from './packets/game/ClientboundAddExperienceOrbPacket';
import ClientboundAddMobPacket from './packets/game/ClientboundAddMobPacket';
import ClientboundAddPaintingPacket from './packets/game/ClientboundAddPaintingPacket';
import ClientboundAddPlayerPacket from './packets/game/ClientboundAddPlayerPacket';
import ClientboundAddVibrationSignalPacket from './packets/game/ClientboundAddVibrationSignalPacket';
import ClientboundAnimatePacket from './packets/game/ClientboundAnimatePacket';
import ClientboundAwardStatsPacket from './packets/game/ClientboundAwardStatsPacket';
import ClientboundBlockBreakAckPacket from './packets/game/ClientboundBlockBreakAckPacket';
import ClientboundBlockDestructionPacket from './packets/game/ClientboundBlockDestructionPacket';
import ClientboundBlockEntityDataPacket from './packets/game/ClientboundBlockEntityDataPacket';
import ClientboundBlockEventPacket from './packets/game/ClientboundBlockEventPacket';
import ClientboundBlockUpdatePacket from './packets/game/ClientboundBlockUpdatePacket';
import ClientboundBossEventPacket from './packets/game/ClientboundBossEventPacket';
import ClientboundChangeDifficultyPacket from './packets/game/ClientboundChangeDifficultyPacket';
import ClientboundChatPacket from './packets/game/ClientboundChatPacket';
import ClientboundClearTitlesPacket from './packets/game/ClientboundClearTitlesPacket';
import ClientboundCommandsPacket from './packets/game/ClientboundCommandsPacket';
import ClientboundCommandSuggestionsPacket from './packets/game/ClientboundCommandSuggestionsPacket';
import ClientboundContainerClosePacket from './packets/game/ClientboundContainerClosePacket';
import ClientboundContainerSetContentPacket from './packets/game/ClientboundContainerSetContentPacket';
import ClientboundContainerSetDataPacket from './packets/game/ClientboundContainerSetDataPacket';
import ClientboundContainerSetSlotPacket from './packets/game/ClientboundContainerSetSlotPacket';
import ClientboundCooldownPacket from './packets/game/ClientboundCooldownPacket';
import ClientboundCustomPayloadPacket from './packets/game/ClientboundCustomPayloadPacket';
import ClientboundCustomSoundPacket from './packets/game/ClientboundCustomSoundPacket';
import ClientboundDisconnectPacket from './packets/game/ClientboundDisconnectPacket';
import ClientboundEntityEventPacket from './packets/game/ClientboundEntityEventPacket';
import ClientboundExplodePacket from './packets/game/ClientboundExplodePacket';
import ClientboundForgetLevelChunkPacket from './packets/game/ClientboundForgetLevelChunkPacket';
import ClientboundGameEventPacket from './packets/game/ClientboundGameEventPacket';
import ClientboundHorseScreenOpenPacket from './packets/game/ClientboundHorseScreenOpenPacket';
import ClientboundInitializeBorderPacket from './packets/game/ClientboundInitializeBorderPacket';
import ClientboundKeepAlivePacket from './packets/game/ClientboundKeepAlivePacket';
import ClientboundLevelChunkWithLightPacket from './packets/game/ClientboundLevelChunkWithLightPacket';
import ClientboundLevelEventPacket from './packets/game/ClientboundLevelEventPacket';
import ClientboundLevelParticlesPacket from './packets/game/ClientboundLevelParticlesPacket';
import ClientboundLightUpdatePacket from './packets/game/ClientboundLightUpdatePacket';
import ClientboundLoginPacket from './packets/game/ClientboundLoginPacket';
import ClientboundMapItemDataPacket from './packets/game/ClientboundMapItemDataPacket';
import ClientboundMerchantOffersPacket from './packets/game/ClientboundMerchantOffersPacket';
import ClientboundMoveEntityPacketPos from './packets/game/ClientboundMoveEntityPacketPos';
import ClientboundMoveEntityPacketPosRot from './packets/game/ClientboundMoveEntityPacketPosRot';
import ClientboundMoveEntityPacketRot from './packets/game/ClientboundMoveEntityPacketRot';
import ClientboundMoveVehiclePacket from './packets/game/ClientboundMoveVehiclePacket';
import ClientboundOpenBookPacket from './packets/game/ClientboundOpenBookPacket';
import ClientboundOpenScreenPacket from './packets/game/ClientboundOpenScreenPacket';
import ClientboundOpenSignEditorPacket from './packets/game/ClientboundOpenSignEditorPacket';
import ClientboundPingPacket from './packets/game/ClientboundPingPacket';
import ClientboundPlaceGhostRecipePacket from './packets/game/ClientboundPlaceGhostRecipePacket';
import ClientboundPlayerAbilitiesPacket from './packets/game/ClientboundPlayerAbilitiesPacket';
import ClientboundPlayerCombatEndPacket from './packets/game/ClientboundPlayerCombatEndPacket';
import ClientboundPlayerCombatEnterPacket from './packets/game/ClientboundPlayerCombatEnterPacket';
import ClientboundPlayerCombatKillPacket from './packets/game/ClientboundPlayerCombatKillPacket';
import ClientboundPlayerInfoPacket from './packets/game/ClientboundPlayerInfoPacket';
import ClientboundPlayerLookAtPacket from './packets/game/ClientboundPlayerLookAtPacket';
import ClientboundPlayerPositionPacket from './packets/game/ClientboundPlayerPositionPacket';
import ClientboundRecipePacket from './packets/game/ClientboundRecipePacket';
import ClientboundRemoveEntitiesPacket from './packets/game/ClientboundRemoveEntitiesPacket';
import ClientboundRemoveMobEffectPacket from './packets/game/ClientboundRemoveMobEffectPacket';
import ClientboundResourcePackPacket from './packets/game/ClientboundResourcePackPacket';
import ClientboundRespawnPacket from './packets/game/ClientboundRespawnPacket';
import ClientboundRotateHeadPacket from './packets/game/ClientboundRotateHeadPacket';
import ClientboundSectionBlocksUpdatePacket from './packets/game/ClientboundSectionBlocksUpdatePacket';
import ClientboundSelectAdvancementsTabPacket from './packets/game/ClientboundSelectAdvancementsTabPacket';
import ClientboundSetActionBarTextPacket from './packets/game/ClientboundSetActionBarTextPacket';
import ClientboundSetBorderCenterPacket from './packets/game/ClientboundSetBorderCenterPacket';
import ClientboundSetBorderLerpSizePacket from './packets/game/ClientboundSetBorderLerpSizePacket';
import ClientboundSetBorderSizePacket from './packets/game/ClientboundSetBorderSizePacket';
import ClientboundSetBorderWarningDelayPacket from './packets/game/ClientboundSetBorderWarningDelayPacket';
import ClientboundSetBorderWarningDistancePacket from './packets/game/ClientboundSetBorderWarningDistancePacket';
import ClientboundSetCameraPacket from './packets/game/ClientboundSetCameraPacket';
import ClientboundSetCarriedItemPacket from './packets/game/ClientboundSetCarriedItemPacket';
import ClientboundSetChunkCacheCenterPacket from './packets/game/ClientboundSetChunkCacheCenterPacket';
import ClientboundSetChunkCacheRadiusPacket from './packets/game/ClientboundSetChunkCacheRadiusPacket';
import ClientboundSetDefaultSpawnPositionPacket from './packets/game/ClientboundSetDefaultSpawnPositionPacket';
import ClientboundSetDisplayObjectivePacket from './packets/game/ClientboundSetDisplayObjectivePacket';
import ClientboundSetEntityDataPacket from './packets/game/ClientboundSetEntityDataPacket';
import ClientboundSetEntityLinkPacket from './packets/game/ClientboundSetEntityLinkPacket';
import ClientboundSetEntityMotionPacket from './packets/game/ClientboundSetEntityMotionPacket';
import ClientboundSetEquipmentPacket from './packets/game/ClientboundSetEquipmentPacket';
import ClientboundSetExperiencePacket from './packets/game/ClientboundSetExperiencePacket';
import ClientboundSetHealthPacket from './packets/game/ClientboundSetHealthPacket';
import ClientboundSetObjectivePacket from './packets/game/ClientboundSetObjectivePacket';
import ClientboundSetPassengersPacket from './packets/game/ClientboundSetPassengersPacket';
import ClientboundSetPlayerTeamPacket from './packets/game/ClientboundSetPlayerTeamPacket';
import ClientboundSetScorePacket from './packets/game/ClientboundSetScorePacket';
import ClientboundSetSimulationDistancePacket from './packets/game/ClientboundSetSimulationDistancePacket';
import ClientboundSetSubtitleTextPacket from './packets/game/ClientboundSetSubtitleTextPacket';
import ClientboundSetTimePacket from './packets/game/ClientboundSetTimePacket';
import ClientboundSetTitlesAnimationPacket from './packets/game/ClientboundSetTitlesAnimationPacket';
import ClientboundSetTitleTextPacket from './packets/game/ClientboundSetTitleTextPacket';
import ClientboundSoundEntityPacket from './packets/game/ClientboundSoundEntityPacket';
import ClientboundSoundPacket from './packets/game/ClientboundSoundPacket';
import ClientboundStopSoundPacket from './packets/game/ClientboundStopSoundPacket';
import ClientboundTabListPacket from './packets/game/ClientboundTabListPacket';
import ClientboundTagQueryPacket from './packets/game/ClientboundTagQueryPacket';
import ClientboundTakeItemEntityPacket from './packets/game/ClientboundTakeItemEntityPacket';
import ClientboundTeleportEntityPacket from './packets/game/ClientboundTeleportEntityPacket';
import ClientboundUpdateAdvancementsPacket from './packets/game/ClientboundUpdateAdvancementsPacket';
import ClientboundUpdateAttributesPacket from './packets/game/ClientboundUpdateAttributesPacket';
import ClientboundUpdateMobEffectPacket from './packets/game/ClientboundUpdateMobEffectPacket';
import ClientboundUpdateRecipesPacket from './packets/game/ClientboundUpdateRecipesPacket';
import ClientboundUpdateTagsPacket from './packets/game/ClientboundUpdateTagsPacket';
import ServerboundAcceptTeleportationPacket from './packets/game/ServerboundAcceptTeleportationPacket';
import ServerboundBlockEntityTagQueryPacket from './packets/game/ServerboundBlockEntityTagQueryPacket';
import ServerboundChangeDifficultyPacket from './packets/game/ServerboundChangeDifficultyPacket';
import ServerboundChatPacket from './packets/game/ServerboundChatPacket';
import ServerboundClientCommandPacket from './packets/game/ServerboundClientCommandPacket';
import ServerboundClientInformationPacket from './packets/game/ServerboundClientInformationPacket';
import ServerboundCommandSuggestionPacket from './packets/game/ServerboundCommandSuggestionPacket';
import ServerboundContainerButtonClickPacket from './packets/game/ServerboundContainerButtonClickPacket';
import ServerboundContainerClickPacket from './packets/game/ServerboundContainerClickPacket';
import ServerboundContainerClosePacket from './packets/game/ServerboundContainerClosePacket';
import ServerboundCustomPayloadPacket from './packets/game/ServerboundCustomPayloadPacket';
import ServerboundEditBookPacket from './packets/game/ServerboundEditBookPacket';
import ServerboundEntityTagQueryPacket from './packets/game/ServerboundEntityTagQueryPacket';
import ServerboundInteractPacket from './packets/game/ServerboundInteractPacket';
import ServerboundJigsawGeneratePacket from './packets/game/ServerboundJigsawGeneratePacket';
import ServerboundKeepAlivePacket from './packets/game/ServerboundKeepAlivePacket';
import ServerboundLockDifficultyPacket from './packets/game/ServerboundLockDifficultyPacket';
import ServerboundMovePlayerPosPacket from './packets/game/ServerboundMovePlayerPosPacket';
import ServerboundMovePlayerPosRotPacket from './packets/game/ServerboundMovePlayerPosRotPacket';
import ServerboundMovePlayerRotPacket from './packets/game/ServerboundMovePlayerRotPacket';
import ServerboundMovePlayerStatusOnlyPacket from './packets/game/ServerboundMovePlayerStatusOnlyPacket';
import ServerboundMoveVehiclePacket from './packets/game/ServerboundMoveVehiclePacket';
import ServerboundPaddleBoatPacket from './packets/game/ServerboundPaddleBoatPacket';
import ServerboundPickItemPacket from './packets/game/ServerboundPickItemPacket';
import ServerboundPlaceRecipePacket from './packets/game/ServerboundPlaceRecipePacket';
import ServerboundPlayerAbilitiesPacket from './packets/game/ServerboundPlayerAbilitiesPacket';
import ServerboundPlayerActionPacket from './packets/game/ServerboundPlayerActionPacket';
import ServerboundPlayerCommandPacket from './packets/game/ServerboundPlayerCommandPacket';
import ServerboundPlayerInputPacket from './packets/game/ServerboundPlayerInputPacket';
import ServerboundPongPacket from './packets/game/ServerboundPongPacket';
import ServerboundRecipeBookChangeSettingsPacket from './packets/game/ServerboundRecipeBookChangeSettingsPacket';
import ServerboundRecipeBookSeenRecipePacket from './packets/game/ServerboundRecipeBookSeenRecipePacket';
import ServerboundRenameItemPacket from './packets/game/ServerboundRenameItemPacket';
import ServerboundResourcePackPacket from './packets/game/ServerboundResourcePackPacket';
import ServerboundSeenAdvancementsPacket from './packets/game/ServerboundSeenAdvancementsPacket';
import ServerboundSelectTradePacket from './packets/game/ServerboundSelectTradePacket';
import ServerboundSetBeaconPacket from './packets/game/ServerboundSetBeaconPacket';
import ServerboundSetCarriedItemPacket from './packets/game/ServerboundSetCarriedItemPacket';
import ServerboundSetCommandBlockPacket from './packets/game/ServerboundSetCommandBlockPacket';
import ServerboundSetCommandMinecartPacket from './packets/game/ServerboundSetCommandMinecartPacket';
import ServerboundSetCreativeModeSlotPacket from './packets/game/ServerboundSetCreativeModeSlotPacket';
import ServerboundSetJigsawBlockPacket from './packets/game/ServerboundSetJigsawBlockPacket';
import ServerboundSetStructureBlockPacket from './packets/game/ServerboundSetStructureBlockPacket';
import ServerboundSignUpdatePacket from './packets/game/ServerboundSignUpdatePacket';
import ServerboundSwingPacket from './packets/game/ServerboundSwingPacket';
import ServerboundTeleportToEntityPacket from './packets/game/ServerboundTeleportToEntityPacket';
import ServerboundUseItemOnPacket from './packets/game/ServerboundUseItemOnPacket';
import ServerboundUseItemPacket from './packets/game/ServerboundUseItemPacket ';
import ServerboundClientIntentionPacket from './packets/handshake/ServerboundClientIntentionPacket';
import ClientboundCustomQueryPacket from './packets/login/ClientboundCustomQueryPacket';
import ClientboundGameProfilePacket from './packets/login/ClientboundGameProfilePacket';
import ClientboundHelloPacket from './packets/login/ClientboundHelloPacket';
import ClientboundLoginCompressionPacket from './packets/login/ClientboundLoginCompressionPacket';
import ClientboundLoginDisconnectPacket from './packets/login/ClientboundLoginDisconnectPacket';
import ServerboundCustomQueryPacket from './packets/login/ServerboundCustomQueryPacket';
import ServerboundHelloPacket from './packets/login/ServerboundHelloPacket';
import ServerboundKeyPacket from './packets/login/ServerboundKeyPacket';
import type ServerboundPacket from './packets/ServerboundPacket';
import ClientboundPongResponsePacket from './packets/status/ClientboundPongResponsePacket';
import ClientboundStatusResponsePacket from './packets/status/ClientboundStatusResponsePacket';
import ServerboundPingRequestPacket from './packets/status/ServerboundPingRequestPacket';
import ServerboundStatusRequestPacket from './packets/status/ServerboundStatusRequestPacket';

export default class Protocol {
    private protocolHandshakeHandlers: Handler<ServerboundPacket>[] = [new ClientIntentionHandler()];
    private protocolHandshakePackets: ServerboundPacket[] = [new ServerboundClientIntentionPacket()];
    private protocolStatusPackets: ServerboundPacket[] = [
        new ServerboundStatusRequestPacket(),
        new ServerboundPingRequestPacket(),
    ];
    private protocolClientStatusPackets: any[] = [ClientboundStatusResponsePacket, ClientboundPongResponsePacket];
    private protocolStatusHandlers: Handler<ServerboundPacket>[] = [
        new StatusRequestHandler(),
        new PingRequestHandler(),
    ];
    private protocolLoginPackets: ServerboundPacket[] = [
        new ServerboundHelloPacket(),
        new ServerboundKeyPacket(),
        new ServerboundCustomQueryPacket(),
    ];
    private protocolClientLoginPackets: any[] = [
        ClientboundLoginDisconnectPacket,
        ClientboundHelloPacket,
        ClientboundGameProfilePacket,
        ClientboundLoginCompressionPacket,
        ClientboundCustomQueryPacket,
    ];
    private protocolLoginHandlers: Handler<ServerboundPacket>[] = [
        new HelloHandler(),
        new KeyHandler(),
        new CustomQueryHandler(),
    ];
    private protocolPlayPackets: ServerboundPacket[] = [
        new ServerboundAcceptTeleportationPacket(),
        new ServerboundBlockEntityTagQueryPacket(),
        new ServerboundChangeDifficultyPacket(),
        new ServerboundChatPacket(),
        new ServerboundClientCommandPacket(),
        new ServerboundClientInformationPacket(),
        new ServerboundCommandSuggestionPacket(),
        new ServerboundContainerButtonClickPacket(),
        new ServerboundContainerClickPacket(),
        new ServerboundContainerClosePacket(),
        new ServerboundCustomPayloadPacket(),
        new ServerboundEditBookPacket(),
        new ServerboundEntityTagQueryPacket(),
        new ServerboundInteractPacket(),
        new ServerboundJigsawGeneratePacket(),
        new ServerboundKeepAlivePacket(),
        new ServerboundLockDifficultyPacket(),
        new ServerboundMovePlayerPosPacket(),
        new ServerboundMovePlayerPosRotPacket(),
        new ServerboundMovePlayerRotPacket(),
        new ServerboundMovePlayerStatusOnlyPacket(),
        new ServerboundMoveVehiclePacket(),
        new ServerboundPaddleBoatPacket(),
        new ServerboundPickItemPacket(),
        new ServerboundPlaceRecipePacket(),
        new ServerboundPlayerAbilitiesPacket(),
        new ServerboundPlayerActionPacket(),
        new ServerboundPlayerCommandPacket(),
        new ServerboundPlayerInputPacket(),
        new ServerboundPongPacket(),
        new ServerboundRecipeBookChangeSettingsPacket(),
        new ServerboundRecipeBookSeenRecipePacket(),
        new ServerboundRenameItemPacket(),
        new ServerboundResourcePackPacket(),
        new ServerboundSeenAdvancementsPacket(),
        new ServerboundSelectTradePacket(),
        new ServerboundSetBeaconPacket(),
        new ServerboundSetCarriedItemPacket(),
        new ServerboundSetCommandBlockPacket(),
        new ServerboundSetCommandMinecartPacket(),
        new ServerboundSetCreativeModeSlotPacket(),
        new ServerboundSetJigsawBlockPacket(),
        new ServerboundSetStructureBlockPacket(),
        new ServerboundSignUpdatePacket(),
        new ServerboundSwingPacket(),
        new ServerboundTeleportToEntityPacket(),
        new ServerboundUseItemOnPacket(),
        new ServerboundUseItemPacket(),
    ];
    private protocolClientPlayPackets: any[] = [
        ClientboundAddEntityPacket,
        ClientboundAddExperienceOrbPacket,
        ClientboundAddMobPacket,
        ClientboundAddPaintingPacket,
        ClientboundAddPlayerPacket,
        ClientboundAddVibrationSignalPacket,
        ClientboundAnimatePacket,
        ClientboundAwardStatsPacket,
        ClientboundBlockBreakAckPacket,
        ClientboundBlockDestructionPacket,
        ClientboundBlockEntityDataPacket,
        ClientboundBlockEventPacket,
        ClientboundBlockUpdatePacket,
        ClientboundBossEventPacket,
        ClientboundChangeDifficultyPacket,
        ClientboundChatPacket,
        ClientboundClearTitlesPacket,
        ClientboundCommandSuggestionsPacket,
        ClientboundCommandsPacket,
        ClientboundContainerClosePacket,
        ClientboundContainerSetContentPacket,
        ClientboundContainerSetDataPacket,
        ClientboundContainerSetSlotPacket,
        ClientboundCooldownPacket,
        ClientboundCustomPayloadPacket,
        ClientboundCustomSoundPacket,
        ClientboundDisconnectPacket,
        ClientboundEntityEventPacket,
        ClientboundExplodePacket,
        ClientboundForgetLevelChunkPacket,
        ClientboundGameEventPacket,
        ClientboundHorseScreenOpenPacket,
        ClientboundInitializeBorderPacket,
        ClientboundKeepAlivePacket,
        ClientboundLevelChunkWithLightPacket,
        ClientboundLevelEventPacket,
        ClientboundLevelParticlesPacket,
        ClientboundLightUpdatePacket,
        ClientboundLoginPacket,
        ClientboundMapItemDataPacket,
        ClientboundMerchantOffersPacket,
        ClientboundMoveEntityPacketPos,
        ClientboundMoveEntityPacketPosRot,
        ClientboundMoveEntityPacketRot,
        ClientboundMoveVehiclePacket,
        ClientboundOpenBookPacket,
        ClientboundOpenScreenPacket,
        ClientboundOpenSignEditorPacket,
        ClientboundPingPacket,
        ClientboundPlaceGhostRecipePacket,
        ClientboundPlayerAbilitiesPacket,
        ClientboundPlayerCombatEndPacket,
        ClientboundPlayerCombatEnterPacket,
        ClientboundPlayerCombatKillPacket,
        ClientboundPlayerInfoPacket,
        ClientboundPlayerLookAtPacket,
        ClientboundPlayerPositionPacket,
        ClientboundRecipePacket,
        ClientboundRemoveEntitiesPacket,
        ClientboundRemoveMobEffectPacket,
        ClientboundResourcePackPacket,
        ClientboundRespawnPacket,
        ClientboundRotateHeadPacket,
        ClientboundSectionBlocksUpdatePacket,
        ClientboundSelectAdvancementsTabPacket,
        ClientboundSetActionBarTextPacket,
        ClientboundSetBorderCenterPacket,
        ClientboundSetBorderLerpSizePacket,
        ClientboundSetBorderSizePacket,
        ClientboundSetBorderWarningDelayPacket,
        ClientboundSetBorderWarningDistancePacket,
        ClientboundSetCameraPacket,
        ClientboundSetCarriedItemPacket,
        ClientboundSetChunkCacheCenterPacket,
        ClientboundSetChunkCacheRadiusPacket,
        ClientboundSetDefaultSpawnPositionPacket,
        ClientboundSetDisplayObjectivePacket,
        ClientboundSetEntityDataPacket,
        ClientboundSetEntityLinkPacket,
        ClientboundSetEntityMotionPacket,
        ClientboundSetEquipmentPacket,
        ClientboundSetExperiencePacket,
        ClientboundSetHealthPacket,
        ClientboundSetObjectivePacket,
        ClientboundSetPassengersPacket,
        ClientboundSetPlayerTeamPacket,
        ClientboundSetScorePacket,
        ClientboundSetSimulationDistancePacket,
        ClientboundSetSubtitleTextPacket,
        ClientboundSetTimePacket,
        ClientboundSetTitleTextPacket,
        ClientboundSetTitlesAnimationPacket,
        ClientboundSoundEntityPacket,
        ClientboundSoundPacket,
        ClientboundStopSoundPacket,
        ClientboundTabListPacket,
        ClientboundTagQueryPacket,
        ClientboundTakeItemEntityPacket,
        ClientboundTeleportEntityPacket,
        ClientboundUpdateAdvancementsPacket,
        ClientboundUpdateAttributesPacket,
        ClientboundUpdateMobEffectPacket,
        ClientboundUpdateRecipesPacket,
        ClientboundUpdateTagsPacket,
    ];
    private protocolPlayHandlers: Handler<ServerboundPacket>[] = [
        new AcceptTeleportationHandler(),
        new BlockEntityTagQueryHandler(),
        new ChangeDifficultyHandler(),
        new ChatHandler(),
        new ClientCommandHandler(),
        new ClientInformationHandler(),
        new CommandSuggestionHandler(),
        new ContainerButtonClickHandler(),
        new ContainerClickHandler(),
        new ContainerCloseHandler(),
        new CustomPayloadHandler(),
        new EditBookHandler(),
        new EntityTagQueryHandler(),
        new InteractHandler(),
        new JigsawGenerateHandler(),
        new KeepAliveHandler(),
        new LockDifficultyHandler(),
        new MovePlayerPosHandler(),
        new MovePlayerPosRotHandler(),
        new MovePlayerRotHandler(),
        new MovePlayerStatusOnlyHandler(),
        new MoveVehicleHandler(),
        new PaddleBoatHandler(),
        new PickItemHandler(),
        new PlaceRecipeHandler(),
        new PlayerAbilitiesHandler(),
        new PlayerActionHandler(),
        new PlayerCommandHandler(),
        new PlayerInputHandler(),
        new PongHandler(),
        new RecipeBookChangeSettingsHandler(),
        new RecipeBookSeenRecipeHandler(),
        new RenameItemHandler(),
        new ResourcePackHandler(),
        new SeenAdvancementsHandler(),
        new SelectTradeHandler(),
        new SetBeaconHandler(),
        new SetCarriedItemHandler(),
        new SetCommandBlockHandler(),
        new SetCommandMinecartHandler(),
        new SetCreativeModeSlotHandler(),
        new SetJigsawBlockHandler(),
        new SetStructureBlockHandler(),
        new SignUpdateHandler(),
        new SwingHandler(),
        new TeleportToEntityHandler(),
        new UseItemOnHandler(),
        new UseItemHandler(),
    ];

    public getPacket(state: ProtocolState, id: number): ServerboundPacket | null {
        switch (state) {
            case ProtocolState.HANDSHAKING: {
                return this.protocolHandshakePackets[id] ?? null;
            }

            case ProtocolState.PLAY: {
                return this.protocolPlayPackets[id] ?? null;
            }

            case ProtocolState.STATUS: {
                return this.protocolStatusPackets[id] ?? null;
            }

            case ProtocolState.LOGIN: {
                return this.protocolLoginPackets[id] ?? null;
            }

            default: {
                throw new TypeError(`${state} is an invalid protocol state!`);
            }
        }
    }

    public getHandler(state: ProtocolState, id: number): Handler<ServerboundPacket> | null {
        switch (state) {
            case ProtocolState.HANDSHAKING: {
                return this.protocolHandshakeHandlers[id] ?? null;
            }

            case ProtocolState.PLAY: {
                return this.protocolPlayHandlers[id] ?? null;
            }

            case ProtocolState.STATUS: {
                return this.protocolStatusHandlers[id] ?? null;
            }

            case ProtocolState.LOGIN: {
                return this.protocolLoginHandlers[id] ?? null;
            }

            default: {
                throw new TypeError(`${state} is an invalid protocol state!`);
            }
        }
    }

    public getId(state: ProtocolState, packet: ClientboundPacket): number | null {
        switch (state) {
            case ProtocolState.HANDSHAKING: {
                return null;
            }

            case ProtocolState.PLAY: {
                const packetId: number = this.protocolClientPlayPackets.findIndex(element => packet instanceof element);
                return packetId < 0 ? null : packetId;
            }

            case ProtocolState.STATUS: {
                const packetId: number = this.protocolClientStatusPackets.findIndex(
                    element => packet instanceof element,
                );
                return packetId < 0 ? null : packetId;
            }

            case ProtocolState.LOGIN: {
                const packetId: number = this.protocolClientLoginPackets.findIndex(
                    element => packet instanceof element,
                );
                return packetId < 0 ? null : packetId;
            }

            default: {
                throw new TypeError(`${state} is an invalid protocol state!`);
            }
        }
    }
}

export enum ProtocolState {
    HANDSHAKING = -1,
    PLAY,
    STATUS,
    LOGIN,
}
