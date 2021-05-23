import Server from "../../../server"
import Connection from "../../Connection";
import HandshakePacket from "../../packets/Handshaking/Serverbound/HandshakePacket";
import { HandshakingServerbound, StatusClientbound, LoginServerbound } from "../../types/PacketIds";
import Handler from "../Handler";
import { ConnectionStates } from "../../types/ConnectionState";
import ResponsePacket from "../../packets/Status/Clientbound/ResponsePacket";

export default class HandshakeHandler implements Handler<HandshakePacket> {
    public id = HandshakingServerbound.Handshake;

    public handle(packet: HandshakePacket, server: Server, connection: Connection) {
        connection.state = packet.NextState;
        if (packet.NextState === ConnectionStates.Status) {
            const pk = new ResponsePacket();
            pk.JSONResponse = JSON.stringify({
                version: {
                    name: "1.16.5",
                    protocol: 754
                },
                players: {
                    max: 100,
                    online: 5
                },
                description: {
                    text: "Hello world"
                },
            });
            connection.sendPacket(pk, StatusClientbound.Response);
        }
        if (packet.NextState === ConnectionStates.Login) {
            try {
                packet.readVarInt();
                packet.readVarInt();
                const pack = server.getNetworkRegistry().getPacket(ConnectionStates.Login, LoginServerbound.LoginStart);
                if (!pack) {
                    throw new Error("Error trying to get Login Start Packet");
                }
                const hander = server.getNetworkRegistry().getHandler(ConnectionStates.Login, LoginServerbound.LoginStart);
                if (!hander) {
                    throw new Error("Error trying to get Login Start handler");
                }
                const pk = new pack(packet.getBytes().slice(packet.getOffset()));
                pk.decrypt();
                hander.handle(pk, server, connection);
            } catch { }
        }
    }
}