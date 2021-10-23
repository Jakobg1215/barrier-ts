import { Buffer } from 'node:buffer';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type BarrierTs from '../BarrierTs';
import type Config from '../types/Config';

export default class ConfigReader {
    public static getConfigurations(server: BarrierTs): Config {
        if (!existsSync(this.filePath)) this.createConfigFile();
        const settings: Config = this.defaultValues;
        readFileSync(this.filePath, { encoding: 'utf-8' })
            .split('\r\n')
            .map((config: string): string => config.split('#')[0]?.trim() ?? 'null=null')
            .filter((config: string): boolean => config.length >= 3 && config.includes('='))
            .forEach((config: string): void => {
                const [option, value] = config.split('=');
                if (!option || !value) return;
                if (!(option in settings)) return server.console.warn(`option ${option} is not a option!`);
                switch (typeof (settings as any)[option]) {
                    case 'string': {
                        (settings as any)[option] = value;
                        break;
                    }
                    case 'number': {
                        (settings as any)[option] = parseInt(value) || (settings as any)[option];
                        break;
                    }
                    case 'boolean': {
                        switch (value) {
                            case 'true': {
                                (settings as any)[option] = true;
                                break;
                            }
                            case 'false': {
                                (settings as any)[option] = false;
                                break;
                            }
                            default: {
                                (settings as any)[option] = (settings as any)[option];
                                break;
                            }
                        }
                        break;
                    }
                }
            });
        return settings;
    }

    private static createConfigFile(): void {
        const options: Buffer[] = [];
        const formatOption = (option: string, value: any, comment?: string) => {
            options.push(Buffer.from(comment ? `${option}=${value} # ${comment}\r\n` : `${option}=${value}\r\n`));
        };
        formatOption('port', this.defaultValues.port, 'The port the server will listening on.');
        formatOption('host', this.defaultValues.host);
        formatOption('debug', this.defaultValues.debug, 'To enable debug logs.');
        formatOption('online', this.defaultValues.online);
        formatOption('compression', this.defaultValues.compression);
        formatOption('serverId', this.defaultValues.serverId);
        formatOption('maxplayers', this.defaultValues.maxplayers);
        writeFileSync(this.filePath, Buffer.concat(options), { encoding: 'utf-8' });
    }

    private static readonly defaultValues: Config = {
        port: 25565,
        host: '0.0.0.0',
        debug: false,
        online: false,
        compression: 0,
        serverId: '',
        maxplayers: 20,
    };

    private static readonly filePath: string = join(__dirname, '../../server.properties');
}
