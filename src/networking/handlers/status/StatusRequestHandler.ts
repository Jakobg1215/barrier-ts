import { readFileSync } from 'fs';
import { join } from 'node:path';
import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import ClientboundStatusResponsePacket from '../../packets/status/ClientboundStatusResponsePacket';
import type ServerboundStatusRequestPacket from '../../packets/status/ServerboundStatusRequestPacket';
import type Handler from '../Handler';

export default class StatusRequestHandler implements Handler<ServerboundStatusRequestPacket> {
    public hander(_packet: ServerboundStatusRequestPacket, player: Player, server: BarrierTs): void {
        let icon: string = '';
        if (server.config.icon) {
            try {
                icon = readFileSync(join(__dirname, '../../../../', server.config.icon)).toString('base64url');
            } catch {
                server.console.error(`Can not find icon ${server.config.icon}`);
                icon = '';
            }
        }
        icon;

        player.connection.send(
            new ClientboundStatusResponsePacket(
                JSON.stringify({
                    version: {
                        name: server.minecraftVersion.version,
                        protocol: server.minecraftVersion.protocol,
                    },
                    players: {
                        max: server.config.maxplayers,
                        online: server.playerManager.getOnlinePlayers().length,
                    },
                    description: {
                        text: server.config.motd,
                    },
                    ...(icon ? { favicon: icon } : {}),
                }),
            ),
        );
    }
}
