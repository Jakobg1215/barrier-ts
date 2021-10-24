import { generateKeyPairSync, KeyPairSyncResult } from 'node:crypto';
import { createServer, isIP, Server, Socket } from 'node:net';
import Connection from './networking/Connection';
import type ClientboundPacket from './networking/packets/ClientbountPacket';
import Protocol from './networking/Protocol';
import type Config from './types/Config';
import ConfigReader from './utilities/ConfigReader';
import Console from './utilities/Console';
import World from './world/World';

export default class BarrierTs {
    public readonly minecraftVersion = {
        version: '1.17.1',
        protocol: 756,
    };
    private readonly serverConsole: Console = new Console(this);
    private readonly serverWorld: World = new World();
    private serverConfigurations: Config = ConfigReader.getConfigurations(this);
    private readonly serverProtocol: Protocol = new Protocol();
    private readonly serverPadLock: KeyPairSyncResult<Buffer, Buffer> = generateKeyPairSync('rsa', {
        modulusLength: 1024,
        publicKeyEncoding: {
            type: 'spki',
            format: 'der',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'der',
        },
    });
    private readonly serverNetworking: Server = createServer();
    private readonly serverConnections: Set<Connection> = new Set();
    private serverPlayerCount: number = 0;

    public constructor() {
        if (isIP(this.serverConfigurations.host))
            this.serverNetworking.listen(this.serverConfigurations.port, this.serverConfigurations.host);
        else this.serverNetworking.listen(this.serverConfigurations.port, '0.0.0.0');

        this.serverNetworking.on('listening', (): void => {
            this.serverConsole.log(
                `Server listening on port ${this.serverConfigurations.port} on host ${
                    isIP(this.serverConfigurations.host) ? this.serverConfigurations.host : '0.0.0.0'
                }!`,
            );
        });

        this.serverNetworking.on('connection', (socket: Socket): void => {
            this.serverConsole.debug(`A client is connecting to the server!`);

            this.serverConnections.add(new Connection(socket, this));
        });
    }

    public reload(): void {
        this.serverConfigurations = ConfigReader.getConfigurations(this);
    }

    public addPlayer(): void {
        ++this.serverPlayerCount;
    }

    public removePlayer(): void {
        --this.serverPlayerCount;
    }

    public brodcast(data: ClientboundPacket) {
        this.serverConnections.forEach((con: Connection) => con.send(data));
    }

    public get console(): Console {
        return this.serverConsole;
    }

    public get config(): Config {
        return this.serverConfigurations;
    }

    public get protocol(): Protocol {
        return this.serverProtocol;
    }

    public get padLock(): KeyPairSyncResult<Buffer, Buffer> {
        return this.serverPadLock;
    }

    public get playerCount(): number {
        return this.serverPlayerCount;
    }

    public get connections(): Set<Connection> {
        return this.serverConnections;
    }

    public get world(): World {
        return this.serverWorld;
    }
}

new BarrierTs();
