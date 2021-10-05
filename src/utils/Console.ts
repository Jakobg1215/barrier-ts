import { createInterface, emitKeypressEvents } from 'node:readline';

export default class Console {
    private interface = createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true,
        prompt: '',
        crlfDelay: Number.POSITIVE_INFINITY,
        escapeCodeTimeout: 1500,
    });

    public constructor() {
        emitKeypressEvents(process.stdin);
        process.stdin.setEncoding('utf8');

        this.interface.on('line', line => {
            this.log(line);
        });
    }

    public log(message: any) {
        console.log(`[${this.getTime().join(':')}]`, `${consoleflags.FgGreen}[LOG]${consoleflags.Reset}`, message);
    }

    public warn(message: any) {
        console.log(`[${this.getTime().join(':')}]`, `${consoleflags.FgYellow}[WARN]${consoleflags.Reset}`, message);
    }

    public error(message: any) {
        console.log(`[${this.getTime().join(':')}]`, `${consoleflags.FgRed}[ERROR]${consoleflags.Reset}`, message);
    }

    private getTime() {
        const date = new Date();
        const time = [];
        time.push(date.getSeconds());
        time.push(date.getMinutes());
        time.push(date.getHours());
        time.push(date.getDate());
        time.push(date.getMonth());
        time.push(date.getFullYear());
        return time;
    }
}

enum consoleflags {
    Reset = '\x1b[0m',
    Bright = '\x1b[1m',
    Dim = '\x1b[2m',
    Underscore = '\x1b[4m',
    Blink = '\x1b[5m',
    Reverse = '\x1b[7m',
    Hidden = '\x1b[8m',
    FgBlack = '\x1b[30m',
    FgRed = '\x1b[31m',
    FgGreen = '\x1b[32m',
    FgYellow = '\x1b[33m',
    FgBlue = '\x1b[34m',
    FgMagenta = '\x1b[35m',
    FgCyan = '\x1b[36m',
    FgWhite = '\x1b[37m',
    BgBlack = '\x1b[40m',
    BgRed = '\x1b[41m',
    BgGreen = '\x1b[42m',
    BgYellow = '\x1b[43m',
    BgBlue = '\x1b[44m',
    BgMagenta = '\x1b[45m',
    BgCyan = '\x1b[46m',
    BgWhite = '\x1b[47m',
}
