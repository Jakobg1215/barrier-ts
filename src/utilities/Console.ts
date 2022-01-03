import { log } from 'node:console';
import { stdin } from 'node:process';
import { createInterface } from 'node:readline';

export default class Console {
    private consoleInterface = createInterface(stdin);

    public constructor() {
        this.consoleInterface.on('line', line => {
            this.warn(line);
        });
    }

    public log(text: string) {
        log(`\x1b[32m[LOG]\x1b[0m ${text}`);
    }

    public warn(text: string) {
        log(`\x1b[33m[WARN]\x1b[0m ${text}`);
    }

    public error(text: string) {
        log(`\x1b[31m[ERROR]\x1b[0m ${text}`);
    }
}
