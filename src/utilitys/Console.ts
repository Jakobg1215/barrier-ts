import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline';
import { format } from 'node:util';

export default class Console {
    private consoleInterface = createInterface(stdin);

    public constructor() {
        this.consoleInterface.on('line', (line): void => {
            this.warn(line);
        });
    }

    public log(text: string, ...data: any): void {
        stdout.write(format(`\x1b[32m%s\x1b[0m ${text}`, '[LOG]', ...data, '\r\n'));
    }

    public warn(text: string, ...data: any): void {
        stdout.write(format(`\x1b[33m%s\x1b[0m ${text}`, '[WARN]', ...data, '\r\n'));
    }

    public error(text: string, ...data: any): void {
        stdout.write(format(`\x1b[31m%s\x1b[0m ${text}`, '[ERROR]', ...data, '\r\n'));
    }
}
