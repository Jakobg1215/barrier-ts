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
}

export enum ProtocolState {
    HANDSHAKING = -1,
    PLAY,
    STATUS,
    LOGIN,
}
