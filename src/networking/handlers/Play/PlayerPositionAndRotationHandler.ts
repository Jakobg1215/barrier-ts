import type PlayerConnection from "../../players/PlayerConnection";
import type Handler from "../Handler";
import PlayerPositionAndRotationPacket from "../../packets/Play/serverbound/PlayerPositionAndRotationPacket";
import { PlayServerbound } from "../../types/PacketIds";
import type Server from "../../../server"
import Packet from "../../packets/Packet";

export default class PlayerPositionAndRotationHandler implements Handler<PlayerPositionAndRotationPacket> {
    public id = PlayServerbound.PlayerPositionAndRotation;

    public handle(packet: PlayerPositionAndRotationPacket, server: Server, player: PlayerConnection) {
        player.setOnGround(packet.OnGround);
        let yaw = Math.round(packet.Yaw);
        while (yaw > 360 || yaw < -360) {
            if (yaw > 360) {
                yaw -= 360;
            }
            if (yaw < -360) {
                yaw += 360;
            }
        }
        yaw = Math.round(yaw / (360 / 255));
        if (yaw < 0) yaw = 255 + yaw;
        player.setRotation({ yaw: yaw, pitch: 0 });
        const pozrotpk = new Packet();
        const lokpk = new Packet();
        lokpk.writeVarInt(player.getID());
        lokpk.writeAngle(yaw);
        pozrotpk.writeVarInt(player.getID());
        pozrotpk.writeShort((packet.X * 32 - player.getPosition()[0] * 32) * 128);
        pozrotpk.writeShort((packet.FeetY * 32 - player.getPosition()[1] * 32) * 128);
        pozrotpk.writeShort((packet.Z * 32 - player.getPosition()[2] * 32) * 128);
        pozrotpk.writeAngle(yaw);
        pozrotpk.writeAngle(0);
        pozrotpk.writeBoolean(packet.OnGround);
        server.getPlayerManager().getConnections().forEach(conn => {
            if (conn.getID() === player.getID()) return;
            conn.sendRaw(pozrotpk.buildPacket(0x28));
            conn.sendRaw(lokpk.buildPacket(0x3A));
        });

        player.setPosition({ X: packet.X, Y: packet.FeetY, Z: packet.Z });
    }
}