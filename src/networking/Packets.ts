import ChatMessagePacket from "./packets/Play/serverbound/ChatMessagePacket";
import HandshakePacket from "./packets/Handshaking/Serverbound/HandshakePacket";
import KeepAlivePacket from "./packets/Play/serverbound/KeepAlivePacket";
import LoginStartPacket from "./packets/Login/Serverbound/LoginStartPacket";
import type Packet from "./packets/Packet";
import PingPacket from "./packets/Status/Serverbound/PingPacket";
import RequestPacket from "./packets/Status/Serverbound/RequestPacket";

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