import ChatMessagePacket from "./packets/Play/serverbound/ChatMessagePacket";
import HandshakePacket from "./packets/Handshaking/Serverbound/HandshakePacket";
import Packet from "./packets/Packet";
import ResponsePacket from "./packets/Status/Clientbound/ResponsePacket";
import RequestPacket from "./packets/Status/Serverbound/RequestPacket";
import DisconnectPacket from "./packets/Login/Clientbound/DisconnectPacket";
import LoginStartPacket from "./packets/Login/Serverbound/LoginStartPacket";
import SpawnEntityPacket from "./packets/Play/clientbound/SpawnEntityPacket";

const HandshakingServerboundPackets: typeof Packet[] = [];
const StatusClientboundPackets: typeof Packet[] = [];
const StatusServerboundPackets: typeof Packet[] = [];
const LoginClientboundPackets: typeof Packet[] = [];
const LoginServerboundPackets: typeof Packet[] = [];
const PlayClientboundPackets: typeof Packet[] = [];
const PlayServerboundPackets: typeof Packet[] = [];

// Handshaking Serverbound Packets
HandshakingServerboundPackets.push(HandshakePacket);

// Status Clientbound Packets
StatusClientboundPackets.push(ResponsePacket);

// Status Serverbound Packets
StatusServerboundPackets.push(RequestPacket);

// Login Clientbound Packets
LoginClientboundPackets.push(DisconnectPacket);

// Login Serverbound Packets
LoginServerboundPackets.push(LoginStartPacket);

// Play Clientbound Packets
PlayClientboundPackets.push(SpawnEntityPacket);

// Play Serverbound Packets
PlayServerboundPackets.push(ChatMessagePacket);


export {
    HandshakingServerboundPackets,
    StatusClientboundPackets,
    StatusServerboundPackets,
    LoginClientboundPackets,
    LoginServerboundPackets,
    PlayClientboundPackets,
    PlayServerboundPackets
};