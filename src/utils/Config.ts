import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export default class Config {
    private static settings = '';

    public static getSettings() {
        if (!existsSync(join(__dirname, '../../server.properties'))) Config.crateFile();
        const fileop = {
            port: 25565,
            motd: 'A Barrierts Server',
            'max-players': 10,
            'server-name': 'barrierts',
            'always-day': false,
            icon: '',
        };
        readFileSync(join(__dirname, '../../server.properties'))
            .toString()
            .split('\n')
            .filter(v => v.length > 2)
            .map(v => {
                if (v.includes(';')) return v.split(';')[0].slice(0, -1);
                return v;
            })
            .map(v => JSON.parse(`{"${v.split('=')[0]}":"${v.split('=')[1]}"}`))
            .forEach(v => {
                Object.assign(fileop, v);
            });
        return fileop;
    }

    private static crateFile() {
        this.addSettings('port', { value: 25565, comment: 'This tells what port for the server to use.' });
        this.addSettings('motd', {
            value: 'A Barrierts Server',
            comment: 'This is the Message of the Day for the server list.',
        });
        this.addSettings('max-players', { value: 10, comment: 'Limit how many players can be on your server.' });
        this.addSettings('server-name', { value: 'vanilla', comment: 'The name under the fps in the debug menu.' });
        this.addSettings('always-day', { value: false, comment: 'This will make time stop.' });
        this.addSettings('icon', { value: '', comment: 'The path to the server icon. The icon must be 64 * 64.' });
        writeFileSync(join(__dirname, '../../server.properties'), this.settings);
    }

    private static addSettings(setting: string, options?: { value?: any; comment?: string }) {
        let option = `${setting}=${options?.value}`;
        if (options?.comment) option = option.concat(` ; ${options.comment}`);
        option = option.concat('\n');
        this.settings = this.settings.concat(option);
    }
}
