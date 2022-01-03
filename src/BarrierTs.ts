import { createServer, isIP } from 'node:net';
import Connection from './networking/Connection';
import Protocol from './networking/Protocol';
import Console from './utilities/Console';
import getConfigurations from './utilities/getConfigurations';
import Player from './world/entity/Player/Player';
import PlayerManager from './world/entity/Player/PlayerManager';
import World from './world/World';

export default class BarrierTs {
    public readonly minecraftVersion = {
        version: '1.18.1',
        protocol: 757,
    };
    public readonly console = new Console();
    private serverWorld = new World();
    private serverConfigurations = getConfigurations(this);
    public readonly protocol = new Protocol();
    public readonly networking = createServer();
    public readonly playerManager = new PlayerManager();

    public constructor() {
        if (isIP(this.serverConfigurations.host))
            this.networking.listen(this.serverConfigurations.port, this.serverConfigurations.host);
        else this.networking.listen(this.serverConfigurations.port, '0.0.0.0');

        this.networking.on('listening', () => {
            this.console.log(
                `Server listening on port ${this.serverConfigurations.port} on host ${
                    isIP(this.serverConfigurations.host) ? this.serverConfigurations.host : '0.0.0.0'
                }!`,
            );
        });

        this.networking.on('connection', socket => {
            const connection = new Connection(socket, this);
            const player = new Player(connection);
            this.playerManager.players.set(connection, player);
        });

        setInterval(() => {
            this.tick();
        }, 50);
    }

    public reload() {
        this.serverConfigurations = getConfigurations(this);
    }

    private tick() {}

    public get config() {
        return this.serverConfigurations;
    }

    public get world() {
        return this.serverWorld;
    }
}

new BarrierTs();
