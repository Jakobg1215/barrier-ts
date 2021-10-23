import { generateKeyPairSync, KeyPairSyncResult } from 'node:crypto';
import { createServer, isIP, Server, Socket } from 'node:net';
import Connection from './networking/Connection';
import Protocol from './networking/Protocol';
import type Config from './types/Config';
import ConfigReader from './utilities/ConfigReader';
import Console from './utilities/Console';

export default class BarrierTs {
    public readonly minecraftVersion = {
        version: '1.17.1',
        protocol: 756,
    };
    private readonly serverConsole: Console = new Console(this);
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
    private readonly serverPlayerConnection: Set<Connection> = new Set();

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

            this.serverPlayerConnection.add(new Connection(socket, this));
        });
    }

    public reload(): void {
        this.serverConfigurations = ConfigReader.getConfigurations(this);
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
}

new BarrierTs();
