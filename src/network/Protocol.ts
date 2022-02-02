import type ClientBoundPacket from './protocol/ClientBoundPacket';
import { ConnectionProtocol } from './protocol/ConnectionProtocol';
import ClientBoundAddEntityPacket from './protocol/game/ClientBoundAddEntityPacket';
import ClientBoundAddExperienceOrbPacket from './protocol/game/ClientBoundAddExperienceOrbPacket';
import ClientBoundAddMobPacket from './protocol/game/ClientBoundAddMobPacket';
import ClientBoundAddPaintingPacket from './protocol/game/ClientBoundAddPaintingPacket';
import ClientBoundAddPlayerPacket from './protocol/game/ClientBoundAddPlayerPacket';
import ClientBoundAddVibrationSignalPacket from './protocol/game/ClientBoundAddVibrationSignalPacket';
import ClientBoundAnimatePacket from './protocol/game/ClientBoundAnimatePacket';
import ClientBoundAwardStatsPacket from './protocol/game/ClientBoundAwardStatsPacket';
import ClientBoundBlockBreakAckPacket from './protocol/game/ClientBoundBlockBreakAckPacket';
import ClientBoundBlockDestructionPacket from './protocol/game/ClientBoundBlockDestructionPacket';
import ClientBoundBlockEntityDataPacket from './protocol/game/ClientBoundBlockEntityDataPacket';
import ClientBoundBlockEventPacket from './protocol/game/ClientBoundBlockEventPacket';
import ClientBoundBlockUpdatePacket from './protocol/game/ClientBoundBlockUpdatePacket';
import ClientBoundBossEventPacket from './protocol/game/ClientBoundBossEventPacket';
import ClientBoundChangeDifficultyPacket from './protocol/game/ClientBoundChangeDifficultyPacket';
import ClientBoundChatPacket from './protocol/game/ClientBoundChatPacket';
import ClientBoundClearTitlesPacket from './protocol/game/ClientBoundClearTitlesPacket';
import ClientBoundCommandsPacket from './protocol/game/ClientBoundCommandsPacket';
import ClientBoundCommandSuggestionsPacket from './protocol/game/ClientBoundCommandSuggestionsPacket';
import ClientBoundContainerClosePacket from './protocol/game/ClientBoundContainerClosePacket';
import ClientBoundContainerSetContentPacket from './protocol/game/ClientBoundContainerSetContentPacket';
import ClientBoundContainerSetDataPacket from './protocol/game/ClientBoundContainerSetDataPacket';
import ClientBoundContainerSetSlotPacket from './protocol/game/ClientBoundContainerSetSlotPacket';
import ClientBoundCooldownPacket from './protocol/game/ClientBoundCooldownPacket';
import ClientBoundCustomPayloadPacket from './protocol/game/ClientBoundCustomPayloadPacket';
import ClientBoundCustomSoundPacket from './protocol/game/ClientBoundCustomSoundPacket';
import ClientBoundDisconnectPacket from './protocol/game/ClientBoundDisconnectPacket';
import ClientBoundEntityEventPacket from './protocol/game/ClientBoundEntityEventPacket';
import ClientBoundExplodePacket from './protocol/game/ClientBoundExplodePacket';
import ClientBoundForgetLevelChunkPacket from './protocol/game/ClientBoundForgetLevelChunkPacket';
import ClientBoundGameEventPacket from './protocol/game/ClientBoundGameEventPacket';
import ClientBoundHorseScreenOpenPacket from './protocol/game/ClientBoundHorseScreenOpenPacket';
import ClientBoundInitializeBorderPacket from './protocol/game/ClientBoundInitializeBorderPacket';
import ClientBoundKeepAlivePacket from './protocol/game/ClientBoundKeepAlivePacket';
import ClientBoundLevelChunkWithLightPacket from './protocol/game/ClientBoundLevelChunkWithLightPacket';
import ClientBoundLevelEventPacket from './protocol/game/ClientBoundLevelEventPacket';
import ClientBoundLevelParticlesPacket from './protocol/game/ClientBoundLevelParticlesPacket';
import ClientBoundLightUpdatePacket from './protocol/game/ClientBoundLightUpdatePacket';
import ClientBoundLoginPacket from './protocol/game/ClientBoundLoginPacket';
import ClientBoundMapItemDataPacket from './protocol/game/ClientBoundMapItemDataPacket';
import ClientBoundMerchantOffersPacket from './protocol/game/ClientBoundMerchantOffersPacket';
import ClientBoundMoveEntityPosPacket from './protocol/game/ClientBoundMoveEntityPosPacket';
import ClientBoundMoveEntityPosRotPacket from './protocol/game/ClientBoundMoveEntityPosRotPacket';
import ClientBoundMoveEntityRotPacket from './protocol/game/ClientBoundMoveEntityRotPacket';
import ClientBoundMoveVehiclePacket from './protocol/game/ClientBoundMoveVehiclePacket';
import ClientBoundOpenBookPacket from './protocol/game/ClientBoundOpenBookPacket';
import ClientBoundOpenScreenPacket from './protocol/game/ClientBoundOpenScreenPacket';
import ClientBoundOpenSignEditorPacket from './protocol/game/ClientBoundOpenSignEditorPacket';
import ClientBoundPingPacket from './protocol/game/ClientBoundPingPacket';
import ClientBoundPlaceGhostRecipePacket from './protocol/game/ClientBoundPlaceGhostRecipePacket';
import ClientBoundPlayerAbilitiesPacket from './protocol/game/ClientBoundPlayerAbilitiesPacket';
import ClientBoundPlayerCombatEndPacket from './protocol/game/ClientBoundPlayerCombatEndPacket';
import ClientBoundPlayerCombatEnterPacket from './protocol/game/ClientBoundPlayerCombatEnterPacket';
import ClientBoundPlayerCombatKillPacket from './protocol/game/ClientBoundPlayerCombatKillPacket';
import ClientBoundPlayerInfoPacket from './protocol/game/ClientBoundPlayerInfoPacket';
import ClientBoundPlayerLookAtPacket from './protocol/game/ClientBoundPlayerLookAtPacket';
import ClientBoundPlayerPositionPacket from './protocol/game/ClientBoundPlayerPositionPacket';
import ClientBoundRecipePacket from './protocol/game/ClientBoundRecipePacket';
import ClientBoundRemoveEntitiesPacket from './protocol/game/ClientBoundRemoveEntitiesPacket';
import ClientBoundRemoveMobEffectPacket from './protocol/game/ClientBoundRemoveMobEffectPacket';
import ClientBoundResourcePackPacket from './protocol/game/ClientBoundResourcePackPacket';
import ClientBoundRespawnPacket from './protocol/game/ClientBoundRespawnPacket';
import ClientBoundRotateHeadPacket from './protocol/game/ClientBoundRotateHeadPacket';
import ClientBoundSectionBlocksUpdatePacket from './protocol/game/ClientBoundSectionBlocksUpdatePacket';
import ClientBoundSelectAdvancementsTabPacket from './protocol/game/ClientBoundSelectAdvancementsTabPacket';
import ClientBoundSetActionBarTextPacket from './protocol/game/ClientBoundSetActionBarTextPacket';
import ClientBoundSetBorderCenterPacket from './protocol/game/ClientBoundSetBorderCenterPacket';
import ClientBoundSetBorderLerpSizePacket from './protocol/game/ClientBoundSetBorderLerpSizePacket';
import ClientBoundSetBorderSizePacket from './protocol/game/ClientBoundSetBorderSizePacket';
import ClientBoundSetBorderWarningDelayPacket from './protocol/game/ClientBoundSetBorderWarningDelayPacket';
import ClientBoundSetBorderWarningDistancePacket from './protocol/game/ClientBoundSetBorderWarningDistancePacket';
import ClientBoundSetCameraPacket from './protocol/game/ClientBoundSetCameraPacket';
import ClientBoundSetCarriedItemPacket from './protocol/game/ClientBoundSetCarriedItemPacket';
import ClientBoundSetChunkCacheCenterPacket from './protocol/game/ClientBoundSetChunkCacheCenterPacket';
import ClientBoundSetChunkCacheRadiusPacket from './protocol/game/ClientBoundSetChunkCacheRadiusPacket';
import ClientBoundSetDefaultSpawnPositionPacket from './protocol/game/ClientBoundSetDefaultSpawnPositionPacket';
import ClientBoundSetDisplayObjectivePacket from './protocol/game/ClientBoundSetDisplayObjectivePacket';
import ClientBoundSetEntityDataPacket from './protocol/game/ClientBoundSetEntityDataPacket';
import ClientBoundSetEntityLinkPacket from './protocol/game/ClientBoundSetEntityLinkPacket';
import ClientBoundSetEntityMotionPacket from './protocol/game/ClientBoundSetEntityMotionPacket';
import ClientBoundSetEquipmentPacket from './protocol/game/ClientBoundSetEquipmentPacket';
import ClientBoundSetExperiencePacket from './protocol/game/ClientBoundSetExperiencePacket';
import ClientBoundSetHealthPacket from './protocol/game/ClientBoundSetHealthPacket';
import ClientBoundSetObjectivePacket from './protocol/game/ClientBoundSetObjectivePacket';
import ClientBoundSetPassengersPacket from './protocol/game/ClientBoundSetPassengersPacket';
import ClientBoundSetPlayerTeamPacket from './protocol/game/ClientBoundSetPlayerTeamPacket';
import ClientBoundSetScorePacket from './protocol/game/ClientBoundSetScorePacket';
import ClientBoundSetSimulationDistancePacket from './protocol/game/ClientBoundSetSimulationDistancePacket';
import ClientBoundSetSubtitleTextPacket from './protocol/game/ClientBoundSetSubtitleTextPacket';
import ClientBoundSetTimePacket from './protocol/game/ClientBoundSetTimePacket';
import ClientBoundSetTitlesAnimationPacket from './protocol/game/ClientBoundSetTitlesAnimationPacket';
import ClientBoundSetTitleTextPacket from './protocol/game/ClientBoundSetTitleTextPacket';
import ClientBoundSoundEntityPacket from './protocol/game/ClientBoundSoundEntityPacket';
import ClientBoundSoundPacket from './protocol/game/ClientBoundSoundPacket';
import ClientBoundStopSoundPacket from './protocol/game/ClientBoundStopSoundPacket';
import ClientBoundTabListPacket from './protocol/game/ClientBoundTabListPacket';
import ClientBoundTagQueryPacket from './protocol/game/ClientBoundTagQueryPacket';
import ClientBoundTakeItemEntityPacket from './protocol/game/ClientBoundTakeItemEntityPacket';
import ClientBoundTeleportEntityPacket from './protocol/game/ClientBoundTeleportEntityPacket';
import ClientBoundUpdateAdvancementsPacket from './protocol/game/ClientBoundUpdateAdvancementsPacket';
import ClientBoundUpdateAttributesPacket from './protocol/game/ClientBoundUpdateAttributesPacket';
import ClientBoundUpdateMobEffectPacket from './protocol/game/ClientBoundUpdateMobEffectPacket';
import ClientBoundUpdateRecipesPacket from './protocol/game/ClientBoundUpdateRecipesPacket';
import ClientBoundUpdateTagsPacket from './protocol/game/ClientBoundUpdateTagsPacket';
import ServerBoundAcceptTeleportationPacket from './protocol/game/ServerBoundAcceptTeleportationPacket';
import ServerBoundBlockEntityTagQueryPacket from './protocol/game/ServerBoundBlockEntityTagQuery';
import ServerBoundChangeDifficultyPacket from './protocol/game/ServerBoundChangeDifficultyPacket';
import ServerBoundChatPacket from './protocol/game/ServerBoundChatPacket';
import ServerBoundClientCommandPacket from './protocol/game/ServerBoundClientCommandPacket';
import ServerBoundClientInformationPacket from './protocol/game/ServerBoundClientInformationPacket';
import ServerBoundCommandSuggestionPacket from './protocol/game/ServerBoundCommandSuggestionPacket';
import ServerBoundContainerButtonClickPacket from './protocol/game/ServerBoundContainerButtonClickPacket';
import ServerBoundContainerClickPacket from './protocol/game/ServerBoundContainerClickPacket';
import ServerBoundContainerClosePacket from './protocol/game/ServerBoundContainerClosePacket';
import ServerBoundCustomPayloadPacket from './protocol/game/ServerBoundCustomPayloadPacket';
import ServerBoundEditBookPacket from './protocol/game/ServerBoundEditBookPacket';
import ServerBoundEntityTagQueryPacket from './protocol/game/ServerBoundEntityTagQuery';
import ServerBoundInteractPacket from './protocol/game/ServerBoundInteractPacket';
import ServerBoundJigsawGeneratePacket from './protocol/game/ServerBoundJigsawGeneratePacket';
import ServerBoundKeepAlivePacket from './protocol/game/ServerBoundKeepAlivePacket';
import ServerBoundLockDifficultyPacket from './protocol/game/ServerBoundLockDifficultyPacket';
import ServerBoundMovePlayerPosPacket from './protocol/game/ServerBoundMovePlayerPosPacket';
import ServerBoundMovePlayerPosRotPacket from './protocol/game/ServerBoundMovePlayerPosRotPacket';
import ServerBoundMovePlayerRotPacket from './protocol/game/ServerBoundMovePlayerRotPacket';
import ServerBoundMovePlayerStatusOnlyPacket from './protocol/game/ServerBoundMovePlayerStatusOnlyPacket';
import ServerBoundMoveVehiclePacket from './protocol/game/ServerBoundMoveVehiclePacket';
import ServerBoundPaddleBoatPacket from './protocol/game/ServerBoundPaddleBoatPacket';
import ServerBoundPickItemPacket from './protocol/game/ServerBoundPickItemPacket';
import ServerBoundPlaceRecipePacket from './protocol/game/ServerBoundPlaceRecipePacket';
import ServerBoundPlayerAbilitiesPacket from './protocol/game/ServerBoundPlayerAbilitiesPacket';
import ServerBoundPlayerActionPacket from './protocol/game/ServerBoundPlayerActionPacket';
import ServerBoundPlayerCommandPacket from './protocol/game/ServerBoundPlayerCommandPacket';
import ServerBoundPlayerInputPacket from './protocol/game/ServerBoundPlayerInputPacket';
import ServerBoundPongPacket from './protocol/game/ServerBoundPongPacket';
import ServerBoundRecipeBookChangeSettingsPacket from './protocol/game/ServerBoundRecipeBookChangeSettingsPacket';
import ServerBoundRecipeBookSeenRecipePacket from './protocol/game/ServerBoundRecipeBookSeenRecipePacket';
import ServerBoundRenameItemPacket from './protocol/game/ServerBoundRenameItemPacket';
import ServerBoundResourcePackPacket from './protocol/game/ServerBoundResourcePackPacket';
import ServerBoundSeenAdvancementsPacket from './protocol/game/ServerBoundSeenAdvancementsPacket';
import ServerBoundSelectTradePacket from './protocol/game/ServerBoundSelectTradePacket';
import ServerBoundSetBeaconPacket from './protocol/game/ServerBoundSetBeaconPacket';
import ServerBoundSetCarriedItemPacket from './protocol/game/ServerBoundSetCarriedItemPacket';
import ServerBoundSetCommandBlockPacket from './protocol/game/ServerBoundSetCommandBlockPacket';
import ServerBoundSetCommandMinecartPacket from './protocol/game/ServerBoundSetCommandMinecartPacket';
import ServerBoundSetCreativeModeSlotPacket from './protocol/game/ServerBoundSetCreativeModeSlotPacket';
import ServerBoundSetJigsawBlockPacket from './protocol/game/ServerBoundSetJigsawBlockPacket';
import ServerBoundSetStructureBlockPacket from './protocol/game/ServerBoundSetStructureBlockPacket';
import ServerBoundSignUpdatePacket from './protocol/game/ServerBoundSignUpdatePacket';
import ServerBoundSwingPacket from './protocol/game/ServerBoundSwingPacket';
import ServerBoundTeleportToEntityPacket from './protocol/game/ServerBoundTeleportToEntityPacket';
import ServerBoundUseItemOnPacket from './protocol/game/ServerBoundUseItemOnPacket';
import ServerBoundUseItemPacket from './protocol/game/ServerBoundUseItemPacket';
import ClientIntentionPacket from './protocol/handshake/ClientIntentionPacket';
import ClientBoundCustomQueryPacket from './protocol/login/ClientBoundCustomQueryPacket';
import ClientBoundGameProfilePacket from './protocol/login/ClientBoundGameProfilePacket';
import ClientBoundHelloPacket from './protocol/login/ClientBoundHelloPacket';
import ClientBoundLoginCompressionPacket from './protocol/login/ClientBoundLoginCompressionPacket';
import ClientBoundLoginDisconnectPacket from './protocol/login/ClientBoundLoginDisconnectPacket';
import ServerBoundCustomQueryPacket from './protocol/login/ServerBoundCustomQueryPacket';
import ServerBoundHelloPacket from './protocol/login/ServerBoundHelloPacket';
import ServerBoundKeyPacket from './protocol/login/ServerBoundKeyPacket';
import ClientBoundPongResponsePacket from './protocol/status/ClientBoundPongResponsePacket';
import ClientBoundStatusResponsePacket from './protocol/status/ClientBoundStatusResponsePacket';
import ServerBoundPingRequestPacket from './protocol/status/ServerBoundPingRequestPacket';
import ServerBoundStatusRequestPacket from './protocol/status/ServerBoundStatusRequestPacket';

export default class Protocol {
    private readonly handShakeServerPackets = [ClientIntentionPacket];
    private readonly statusServerPackets = [ServerBoundStatusRequestPacket, ServerBoundPingRequestPacket];
    private readonly loginServerPackets = [ServerBoundHelloPacket, ServerBoundKeyPacket, ServerBoundCustomQueryPacket];
    private readonly gameServerPackets = [
        ServerBoundAcceptTeleportationPacket,
        ServerBoundBlockEntityTagQueryPacket,
        ServerBoundChangeDifficultyPacket,
        ServerBoundChatPacket,
        ServerBoundClientCommandPacket,
        ServerBoundClientInformationPacket,
        ServerBoundCommandSuggestionPacket,
        ServerBoundContainerButtonClickPacket,
        ServerBoundContainerClickPacket,
        ServerBoundContainerClosePacket,
        ServerBoundCustomPayloadPacket,
        ServerBoundEditBookPacket,
        ServerBoundEntityTagQueryPacket,
        ServerBoundInteractPacket,
        ServerBoundJigsawGeneratePacket,
        ServerBoundKeepAlivePacket,
        ServerBoundLockDifficultyPacket,
        ServerBoundMovePlayerPosPacket,
        ServerBoundMovePlayerPosRotPacket,
        ServerBoundMovePlayerRotPacket,
        ServerBoundMovePlayerStatusOnlyPacket,
        ServerBoundMoveVehiclePacket,
        ServerBoundPaddleBoatPacket,
        ServerBoundPickItemPacket,
        ServerBoundPlaceRecipePacket,
        ServerBoundPlayerAbilitiesPacket,
        ServerBoundPlayerActionPacket,
        ServerBoundPlayerCommandPacket,
        ServerBoundPlayerInputPacket,
        ServerBoundPongPacket,
        ServerBoundRecipeBookChangeSettingsPacket,
        ServerBoundRecipeBookSeenRecipePacket,
        ServerBoundRenameItemPacket,
        ServerBoundResourcePackPacket,
        ServerBoundSeenAdvancementsPacket,
        ServerBoundSelectTradePacket,
        ServerBoundSetBeaconPacket,
        ServerBoundSetCarriedItemPacket,
        ServerBoundSetCommandBlockPacket,
        ServerBoundSetCommandMinecartPacket,
        ServerBoundSetCreativeModeSlotPacket,
        ServerBoundSetJigsawBlockPacket,
        ServerBoundSetStructureBlockPacket,
        ServerBoundSignUpdatePacket,
        ServerBoundSwingPacket,
        ServerBoundTeleportToEntityPacket,
        ServerBoundUseItemOnPacket,
        ServerBoundUseItemPacket,
    ];

    private readonly statusClientPackets = [ClientBoundStatusResponsePacket, ClientBoundPongResponsePacket];
    private readonly loginClientPackets = [
        ClientBoundLoginDisconnectPacket,
        ClientBoundHelloPacket,
        ClientBoundGameProfilePacket,
        ClientBoundLoginCompressionPacket,
        ClientBoundCustomQueryPacket,
    ];
    private readonly gameClientPackets = [
        ClientBoundAddEntityPacket,
        ClientBoundAddExperienceOrbPacket,
        ClientBoundAddMobPacket,
        ClientBoundAddPaintingPacket,
        ClientBoundAddPlayerPacket,
        ClientBoundAddVibrationSignalPacket,
        ClientBoundAnimatePacket,
        ClientBoundAwardStatsPacket,
        ClientBoundBlockBreakAckPacket,
        ClientBoundBlockDestructionPacket,
        ClientBoundBlockEntityDataPacket,
        ClientBoundBlockEventPacket,
        ClientBoundBlockUpdatePacket,
        ClientBoundBossEventPacket,
        ClientBoundChangeDifficultyPacket,
        ClientBoundChatPacket,
        ClientBoundClearTitlesPacket,
        ClientBoundCommandSuggestionsPacket,
        ClientBoundCommandsPacket,
        ClientBoundContainerClosePacket,
        ClientBoundContainerSetContentPacket,
        ClientBoundContainerSetDataPacket,
        ClientBoundContainerSetSlotPacket,
        ClientBoundCooldownPacket,
        ClientBoundCustomPayloadPacket,
        ClientBoundCustomSoundPacket,
        ClientBoundDisconnectPacket,
        ClientBoundEntityEventPacket,
        ClientBoundExplodePacket,
        ClientBoundForgetLevelChunkPacket,
        ClientBoundGameEventPacket,
        ClientBoundHorseScreenOpenPacket,
        ClientBoundInitializeBorderPacket,
        ClientBoundKeepAlivePacket,
        ClientBoundLevelChunkWithLightPacket,
        ClientBoundLevelEventPacket,
        ClientBoundLevelParticlesPacket,
        ClientBoundLightUpdatePacket,
        ClientBoundLoginPacket,
        ClientBoundMapItemDataPacket,
        ClientBoundMerchantOffersPacket,
        ClientBoundMoveEntityPosPacket,
        ClientBoundMoveEntityPosRotPacket,
        ClientBoundMoveEntityRotPacket,
        ClientBoundMoveVehiclePacket,
        ClientBoundOpenBookPacket,
        ClientBoundOpenScreenPacket,
        ClientBoundOpenSignEditorPacket,
        ClientBoundPingPacket,
        ClientBoundPlaceGhostRecipePacket,
        ClientBoundPlayerAbilitiesPacket,
        ClientBoundPlayerCombatEndPacket,
        ClientBoundPlayerCombatEnterPacket,
        ClientBoundPlayerCombatKillPacket,
        ClientBoundPlayerInfoPacket,
        ClientBoundPlayerLookAtPacket,
        ClientBoundPlayerPositionPacket,
        ClientBoundRecipePacket,
        ClientBoundRemoveEntitiesPacket,
        ClientBoundRemoveMobEffectPacket,
        ClientBoundResourcePackPacket,
        ClientBoundRespawnPacket,
        ClientBoundRotateHeadPacket,
        ClientBoundSectionBlocksUpdatePacket,
        ClientBoundSelectAdvancementsTabPacket,
        ClientBoundSetActionBarTextPacket,
        ClientBoundSetBorderCenterPacket,
        ClientBoundSetBorderLerpSizePacket,
        ClientBoundSetBorderSizePacket,
        ClientBoundSetBorderWarningDelayPacket,
        ClientBoundSetBorderWarningDistancePacket,
        ClientBoundSetCameraPacket,
        ClientBoundSetCarriedItemPacket,
        ClientBoundSetChunkCacheCenterPacket,
        ClientBoundSetChunkCacheRadiusPacket,
        ClientBoundSetDefaultSpawnPositionPacket,
        ClientBoundSetDisplayObjectivePacket,
        ClientBoundSetEntityDataPacket,
        ClientBoundSetEntityLinkPacket,
        ClientBoundSetEntityMotionPacket,
        ClientBoundSetEquipmentPacket,
        ClientBoundSetExperiencePacket,
        ClientBoundSetHealthPacket,
        ClientBoundSetObjectivePacket,
        ClientBoundSetPassengersPacket,
        ClientBoundSetPlayerTeamPacket,
        ClientBoundSetScorePacket,
        ClientBoundSetSimulationDistancePacket,
        ClientBoundSetSubtitleTextPacket,
        ClientBoundSetTimePacket,
        ClientBoundSetTitleTextPacket,
        ClientBoundSetTitlesAnimationPacket,
        ClientBoundSoundEntityPacket,
        ClientBoundSoundPacket,
        ClientBoundStopSoundPacket,
        ClientBoundTabListPacket,
        ClientBoundTagQueryPacket,
        ClientBoundTakeItemEntityPacket,
        ClientBoundTeleportEntityPacket,
        ClientBoundUpdateAdvancementsPacket,
        ClientBoundUpdateAttributesPacket,
        ClientBoundUpdateMobEffectPacket,
        ClientBoundUpdateRecipesPacket,
        ClientBoundUpdateTagsPacket,
    ];

    public getPacket(state: ConnectionProtocol, id: number): any | null {
        switch (state) {
            case ConnectionProtocol.HANDSHAKING: {
                return this.handShakeServerPackets[id] ?? null;
            }

            case ConnectionProtocol.PLAY: {
                return this.gameServerPackets[id] ?? null;
            }

            case ConnectionProtocol.STATUS: {
                return this.statusServerPackets[id] ?? null;
            }

            case ConnectionProtocol.LOGIN: {
                return this.loginServerPackets[id] ?? null;
            }
        }
    }

    public getId(state: ConnectionProtocol, packet: ClientBoundPacket): number | null {
        switch (state) {
            case ConnectionProtocol.HANDSHAKING: {
                return null;
            }

            case ConnectionProtocol.PLAY: {
                const packetId = this.gameClientPackets.findIndex(element => packet instanceof element);
                return packetId < 0 ? null : packetId;
            }

            case ConnectionProtocol.STATUS: {
                const packetId = this.statusClientPackets.findIndex(element => packet instanceof element);
                return packetId < 0 ? null : packetId;
            }

            case ConnectionProtocol.LOGIN: {
                const packetId = this.loginClientPackets.findIndex(element => packet instanceof element);
                return packetId < 0 ? null : packetId;
            }
        }
    }
}
