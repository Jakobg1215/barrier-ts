import type Handler from './handlers/Handler';
import HandshakeHandler from './handlers/Handshaking/HandshakeHandler';
import LegacyServerListPingHandler from './handlers/Handshaking/LegacyServerListPingHandler';
import LoginStartHandler from './handlers/Login/LoginStartHandler';
import AnimationHandler from './handlers/Play/AnimationHandler';
import ChatMessageHandler from './handlers/Play/ChatMessageHandler';
import CreativeInventoryActionHandler from './handlers/Play/CreativeInventoryActionHandler';
import EntityActionHandler from './handlers/Play/EntityActionHandler';
import KeepAliveHandler from './handlers/Play/KeepAliveHandler';
import PlayerAbilitiesHandler from './handlers/Play/PlayerAbilitiesHandler';
import PlayerBlockPlacementHandler from './handlers/Play/PlayerBlockPlacementHandler';
import PlayerDiggingHandler from './handlers/Play/PlayerDiggingHandler';
import PlayerMovementHandler from './handlers/Play/PlayerMovementHandler';
import PlayerPositionAndRotationHandler from './handlers/Play/PlayerPositionAndRotationHandler';
import PlayerPositionHandler from './handlers/Play/PlayerPositionHandler';
import PlayerRotationHandler from './handlers/Play/PlayerRotationHandler';
import PluginMessageHandler from './handlers/Play/PluginMessageHandler';
import TeleportConfirmHandler from './handlers/Play/TeleportConfirmHandler';
import PingHandler from './handlers/Status/PingHandler';
import RequestHandler from './handlers/Status/RequestHandler';

const HandshakeHandlers: Handler<any>[] = [];
const StatusHandlers: Handler<any>[] = [];
const LoginHandlers: Handler<any>[] = [];
const PlayHandlers: Handler<any>[] = [];

// Handshake Handlers
HandshakeHandlers.push(new HandshakeHandler());
HandshakeHandlers.push(new LegacyServerListPingHandler());

// Status Handlers
StatusHandlers.push(new RequestHandler());
StatusHandlers.push(new PingHandler());

// Login Handlers
LoginHandlers.push(new LoginStartHandler());

// Play Handlers
PlayHandlers.push(new AnimationHandler());
PlayHandlers.push(new ChatMessageHandler());
PlayHandlers.push(new CreativeInventoryActionHandler());
PlayHandlers.push(new EntityActionHandler());
PlayHandlers.push(new KeepAliveHandler());
PlayHandlers.push(new PlayerAbilitiesHandler());
PlayHandlers.push(new PlayerBlockPlacementHandler());
PlayHandlers.push(new PlayerDiggingHandler());
PlayHandlers.push(new PlayerMovementHandler());
PlayHandlers.push(new PlayerPositionAndRotationHandler());
PlayHandlers.push(new PlayerPositionHandler());
PlayHandlers.push(new PlayerRotationHandler());
PlayHandlers.push(new PluginMessageHandler());
PlayHandlers.push(new TeleportConfirmHandler());

export { HandshakeHandlers, StatusHandlers, LoginHandlers, PlayHandlers };
