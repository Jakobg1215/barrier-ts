import ChatMessagePacket from "./packets/Play/serverbound/ChatMessagePacket";
import HandshakePacket from "./packets/Handshaking/Serverbound/HandshakePacket";
import Packet from "./packets/Packet";
import RequestPacket from "./packets/Status/Serverbound/RequestPacket";
import LoginStartPacket from "./packets/Login/Serverbound/LoginStartPacket";
import PingPacket from "./packets/Status/Serverbound/PingPacket";
import KeepAlivePacket from "./packets/Play/serverbound/KeepAlivePacket";

const HandshakingPackets: typeof Packet[] = [];
const StatusPackets: typeof Packet[] = [];
const LoginPackets: typeof Packet[] = [];
const PlayPackets: typeof Packet[] = [];

// Handshaking Packets
HandshakingPackets.push(HandshakePacket);

// Status Packets
StatusPackets.push(RequestPacket);
StatusPackets.push(PingPacket);

// Login Packets
LoginPackets.push(LoginStartPacket);

// Play Packets
PlayPackets.push(ChatMessagePacket);
PlayPackets.push(KeepAlivePacket);


export {
    HandshakingPackets,
    StatusPackets,
    LoginPackets,
    PlayPackets
};