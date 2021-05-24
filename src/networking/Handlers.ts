import type Handler from "./handlers/Handler";
import HandshakeHandler from "./handlers/Handshaking/HandshakeHandler";
import KeepAliveHandler from "./handlers/Play/KeepAliveHandler";
import LoginStartHandler from "./handlers/Login/LoginStartHandler";
import PingHandler from "./handlers/Status/PingHandler";
import PlayerPositionAndRotationHandler from "./handlers/Play/PlayerPositionAndRotationHandler";
import PlayerPositionHandler from "./handlers/Play/PlayerPositionHandler";
import PlayerRotationHandler from "./handlers/Play/PlayerRotationHandler";
import RequestHandler from "./handlers/Status/RequestHandler";

const HandshakeHandlers: Handler<any>[] = [];
const StatusHandlers: Handler<any>[] = [];
const LoginHandlers: Handler<any>[] = [];
const PlayHandlers: Handler<any>[] = [];

// Handshake Handlers
HandshakeHandlers.push(new HandshakeHandler);

// Status Handlers
StatusHandlers.push(new RequestHandler);
StatusHandlers.push(new PingHandler);

// Login Handlers
LoginHandlers.push(new LoginStartHandler);

// Play Handlers
PlayHandlers.push(new KeepAliveHandler);
PlayHandlers.push(new PlayerPositionAndRotationHandler);
PlayHandlers.push(new PlayerPositionHandler);
PlayHandlers.push(new PlayerRotationHandler);

export {
    HandshakeHandlers,
    StatusHandlers,
    LoginHandlers,
    PlayHandlers
}