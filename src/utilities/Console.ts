import { log } from 'node:console';
import { stdin } from 'node:process';
import { createInterface, Interface } from 'node:readline';
import type BarrierTs from '../BarrierTs';

export default class Console {
    private consoleInterface: Interface = createInterface(stdin);
    private consoleServer: BarrierTs;

    public constructor(server: BarrierTs) {
        this.consoleServer = server;
        this.consoleInterface.on('line', (line: string): void => {
            if (line === 'reload') {
                this.log('reloading');
                return this.consoleServer.reload();
            }
            this.warn(line);
        });
    }

    public log(text: string): void {
        log(`\x1b[32m[LOG]\x1b[0m ${text}`);
    }

    public warn(text: string): void {
        log(`\x1b[33m[WARN]\x1b[0m ${text}`);
    }

    public error(text: string): void {
        log(`\x1b[31m[ERROR]\x1b[0m ${text}`);
    }

    public debug(text: string): void {
        if (this.consoleServer.config.debug) log(`\x1b[35m[DEBUG]\x1b[0m ${text}`);
    }
}
