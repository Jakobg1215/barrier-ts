import fs from 'fs';
import path from 'path';

export default class Config {
    private static settings = '';

    public static getSettings() {
        if (!fs.existsSync(path.join(__dirname, '../../server.properties'))) Config.crateFile();
        const fileop = {
            port: '25565',
            motd: 'A Barrierts Server',
            'max-players': 10,
        };
        fs.readFileSync(path.join(__dirname, '../../server.properties'))
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
        this.addSettings('max-players', { value: 10, comment: 'Right now this is visual only.' });
        fs.writeFileSync(path.join(__dirname, '../../server.properties'), this.settings);
    }

    private static addSettings(setting: string, options?: { value?: any; comment?: string }) {
        let option = `${setting}=${options?.value}`;
        if (options?.comment) option = option.concat(` ; ${options.comment}`);
        option = option.concat('\n');
        this.settings = this.settings.concat(option);
    }
}

Config.getSettings();
