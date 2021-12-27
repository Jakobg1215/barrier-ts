import { createReadStream, createWriteStream, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import type BarrierTs from '../BarrierTs';
import type Config from '../types/Config';

const filePath = join(__dirname, '../../server.properties');

const createConfigFile = (values: Config) => {
    const file = createWriteStream(filePath);

    const formatOption = (option: string, value: any, comment?: string) => {
        file.write(comment ? `${option}=${value} # ${comment}\r\n` : `${option}=${value}\r\n`);
    };
    formatOption('port', values.port, 'The port the server will listening on.');
    formatOption('host', values.host);
    formatOption('debug', values.debug, 'To enable debug logs.');
    formatOption('online', values.online, 'Validate players with Mojang servers.');
    formatOption('compression', values.compression, 'The threshold before packets are compressed.');
    formatOption('serverId', values.serverId, 'Shows in the debug menu.');
    formatOption('maxplayers', values.maxplayers, 'The max amunt of players that can join.');
    formatOption('motd', values.motd, 'The message of the day.');
    formatOption('icon', values.icon, 'The path to the server icon. (must be 64*64 png)');
    file.end();
}

export default function getConfigurations(server: BarrierTs) {
    const defaultValues: Config = {
        port: 25565,
        host: '0.0.0.0',
        debug: false,
        online: true,
        compression: 256,
        serverId: '',
        maxplayers: 20,
        motd: 'A BarrierTs Server',
        difficulty: 2,
        icon: ''
    }

    if (!existsSync(filePath)) createConfigFile(defaultValues);

    createInterface(createReadStream(filePath)).on('line', line => {
        const [property] = line.split('#') as [string];
        if (!property.includes('=')) return server.console.error('');
        const [option, value] = property.trim().split('=') as [string, string];
        if (!(option in defaultValues)) return server.console.error('')
        switch (typeof (defaultValues as any)[option]) {
            case 'string': {
                (defaultValues as any)[option] = value;
                break;
            }

            case 'number': {
                (defaultValues as any)[option] = parseInt(value) || (defaultValues as any)[option];
                break;
            }

            case 'boolean': {
                switch (value) {
                    case 'true': {
                        (defaultValues as any)[option] = true;
                        break;
                    }

                    case 'false': {
                        (defaultValues as any)[option] = false;
                        break;
                    }

                    default: {
                        (defaultValues as any)[option] = (defaultValues as any)[option];
                        break;
                    }
                }
                break;
            }

            default: {
                (defaultValues as any)[option] = value;
                break;
            }
        }
    });

    return defaultValues;
}

