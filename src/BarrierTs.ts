import { readFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { join } from 'node:path';
import Connection from './network/Connection';
import HandshakePacketListener from './network/HandshakePacketListener';
import Protocol from './network/Protocol';
import type ServerStatus from './network/protocol/status/ServerStatus';
import type Config from './types/Config';
import Console from './utilitys/Console';
import getConfigurations from './utilitys/getConfigurations';
import PlayerManager from './world/PlayerManager';
import World from './world/World';

export default class BarrierTs {
    public readonly minecraftVersion = {
        name: '1.18.1',
        protocol: 757,
    };
    public readonly console = new Console();
    private serverConfigurations!: Config;
    public readonly protocol = new Protocol();
    public readonly networking = createServer();
    public readonly playerManager = new PlayerManager(this);
    private serverWorld = new World(this);
    private iconData!: string | null;

    public constructor() {
        this.init();

        this.networking.on('listening', (): void => {
            this.console.log(
                'Server listening on port %s on host %s!',
                this.serverConfigurations.port,
                this.serverConfigurations.host,
            );
        });

        this.networking.on('connection', (socket): void => {
            const connection = new Connection(socket, this);
            connection.setListener(new HandshakePacketListener(this, connection));
            this.playerManager.connections.add(connection);
        });
    }

    private async init(): Promise<void> {
        this.serverConfigurations = await getConfigurations(this);
        if (this.serverConfigurations.icon.length > 0) {
            try {
                this.iconData = readFileSync(join(__dirname, '../', this.serverConfigurations.icon)).toString('base64');
            } catch {
                this.iconData = null;
                this.console.error('Failed to get server icon!');
            }
        } else this.iconData = null;

        this.networking.listen(this.serverConfigurations.port, this.serverConfigurations.host);

        setInterval((): void => {
            this.tick();
        }, 50);
    }

    public async reload(): Promise<void> {
        this.serverConfigurations = await getConfigurations(this);
    }

    private tick(): void {
        this.playerManager.tick();
        this.world.tick();
    }

    public getStatus(): ServerStatus {
        return {
            version: this.minecraftVersion,
            players: {
                max: this.serverConfigurations.maxplayers,
                online: this.playerManager.players.size,
            },
            description: this.serverConfigurations.motd,
            ...(this.iconData ? { favicon: `data:image/png;base64,${this.iconData}` } : {}),
        };
    }

    public get config() {
        return this.serverConfigurations;
    }

    public get world() {
        return this.serverWorld;
    }
}
