import type PlayerConnection from "../../players/PlayerConnection";
import type Handler from "../Handler";
import PlayerRotationPacket from "../../packets/Play/serverbound/PlayerRotationPacket";
import { PlayServerbound } from "../../types/PacketIds";
import type Server from "../../../server"
import Packet from "../../packets/Packet";

export default class PlayerRotationHandler implements Handler<PlayerRotationPacket> {
    public id = PlayServerbound.PlayerRotation;

    public handle(packet: PlayerRotationPacket, server: Server, player: PlayerConnection) {
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

        const rotpk = new Packet();
        const lokpk = new Packet();
        lokpk.writeVarInt(player.getID());
        lokpk.writeAngle(yaw);
        rotpk.writeVarInt(player.getID());
        rotpk.writeAngle(yaw);
        rotpk.writeAngle(0);
        rotpk.writeBoolean(true);
        server.getPlayerManager().getConnections().forEach(conn => {
            if (conn.getID() === player.getID()) return;
            conn.sendRaw(rotpk.buildPacket(0x29));
            conn.sendRaw(lokpk.buildPacket(0x3A));
        });
    }
}