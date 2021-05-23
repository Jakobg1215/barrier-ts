import ChatMessagePacket from "./packets/Play/serverbound/ChatMessagePacket";
import HandshakePacket from "./packets/Handshaking/Serverbound/HandshakePacket";
import Packet from "./packets/Packet";

const HandshakingPackets: typeof Packet[] = [];
const StatusPackets: typeof Packet[] = [];
const LoginPackets: typeof Packet[] = [];
const PlayPackets: typeof Packet[] = [];

// Handshaking Packets
HandshakingPackets.push(HandshakePacket);

// Status Packets


// Login Packets


// Play Packets
PlayPackets.push(ChatMessagePacket);


export {
    HandshakingPackets,
    StatusPackets,
    LoginPackets,
    PlayPackets
};