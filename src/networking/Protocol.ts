import type Handler from './handlers/Handler';
import ClientIntentionHandler from './handlers/handshake/ClientIntentionHandler';
import CustomQueryHandler from './handlers/login/CustomQueryHandler';
import HelloHandler from './handlers/login/HelloHandler';
import KeyHandler from './handlers/login/KeyHandler';
import PingRequestHandler from './handlers/status/PingRequestHandler';
import StatusRequestHandler from './handlers/status/StatusRequestHandler';
import ServerboundAcceptTeleportationPacket from './packets/game/ServerboundAcceptTeleportationPacket';
import ServerboundBlockEntityTagQuery from './packets/game/ServerboundBlockEntityTagQuery';
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
import ServerboundEntityTagQuery from './packets/game/ServerboundEntityTagQuery';
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
import ServerboundCustomQueryPacket from './packets/login/ServerboundCustomQueryPacket';
import ServerboundHelloPacket from './packets/login/ServerboundHelloPacket';
import ServerboundKeyPacket from './packets/login/ServerboundKeyPacket';
import type ServerboundPacket from './packets/ServerboundPacket';
import ServerboundPingRequestPacket from './packets/status/ServerboundPingRequestPacket';
import ServerboundStatusRequestPacket from './packets/status/ServerboundStatusRequestPacket';

export default class Protocol {
    private protocolHandshakeHandlers: Handler<ServerboundPacket>[] = [new ClientIntentionHandler()];
    private protocolHandshakePackets: ServerboundPacket[] = [new ServerboundClientIntentionPacket()];
    private protocolStatusPackets: ServerboundPacket[] = [
        new ServerboundStatusRequestPacket(),
        new ServerboundPingRequestPacket(),
    ];
    private protocolStatusHandlers: Handler<ServerboundPacket>[] = [
        new StatusRequestHandler(),
        new PingRequestHandler(),
    ];
    private protocolLoginPackets: ServerboundPacket[] = [
        new ServerboundHelloPacket(),
        new ServerboundKeyPacket(),
        new ServerboundCustomQueryPacket(),
    ];
    private protocolLoginHandlers: Handler<ServerboundPacket>[] = [
        new HelloHandler(),
        new KeyHandler(),
        new CustomQueryHandler(),
    ];
    private protocolPlayPackets: ServerboundPacket[] = [
        new ServerboundAcceptTeleportationPacket(),
        new ServerboundBlockEntityTagQuery(),
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
        new ServerboundEntityTagQuery(),
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
                return null;
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
}

export enum ProtocolState {
    HANDSHAKING = -1,
    PLAY,
    STATUS,
    LOGIN,
}
