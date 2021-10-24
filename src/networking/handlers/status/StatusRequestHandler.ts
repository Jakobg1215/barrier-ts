import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import ClientboundStatusResponsePacket from '../../packets/status/ClientboundStatusResponsePacket';
import type ServerboundStatusRequestPacket from '../../packets/status/ServerboundStatusRequestPacket';
import type Handler from '../Handler';

export default class StatusRequestHandler implements Handler<ServerboundStatusRequestPacket> {
    public hander(_packet: ServerboundStatusRequestPacket, connection: Connection, server: BarrierTs): void {
        const response = {};

        Object.assign(response, {
            version: {
                name: server.minecraftVersion.version,
                protocol: server.minecraftVersion.protocol,
            },
        });

        const samples = Array.from(server.connections)
            .slice(0, 5)
            .map((element: Connection) => {
                if (!element) return;
                if (element.player) {
                    return { name: element.player.gameProfile.name, id: element.player.gameProfile.uuid };
                }
                return;
            })
            .filter(element => element !== undefined);

        Object.assign(response, {
            players: {
                max: server.config.maxplayers,
                online: server.playerCount,
                sample: samples,
            },
        });

        Object.assign(response, {
            description: {
                text: server.config.motd,
            },
        });

        if (server.config.icon.length >= 4) {
            try {
                const iconData = readFileSync(join(__dirname, '../../../../', server.config.icon));
                // Should this be loaded in memory so it doesn't have to read everytime?
                Object.assign(response, {
                    favicon: `data:image/png;base64,${iconData.toString('base64')}`,
                });
            } catch {
                server.console.error(`Can not find icon ${server.config.icon}`);
            }
        }
        connection.send(new ClientboundStatusResponsePacket(JSON.stringify(response)));
    }
}
