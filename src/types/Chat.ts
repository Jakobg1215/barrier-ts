export default class Chat {
    private json = {};
    public addText(text: string, options?: textOptions) {
        const newText = {};
        Object.assign(newText, { text: text });
        if (options?.bold) Object.assign(newText, { bold: options.bold });
        if (options?.color) Object.assign(newText, { color: options.color });
        if (options?.font) Object.assign(newText, { font: options.font });
        if (options?.insertion) Object.assign(newText, { insertion: options.insertion });
        if (options?.italic) Object.assign(newText, { italic: options.italic });
        if (options?.obfuscated) Object.assign(newText, { obfuscated: options.obfuscated });
        if (options?.strikethrough) Object.assign(newText, { strikethrough: options.strikethrough });
        if (options?.underlined) Object.assign(newText, { underlined: options.underlined });
        Object.assign(this.json, newText);
    }
    public toJSON() {
        return JSON.stringify(this.json);
    }
}

interface textOptions {
    bold?: boolean;
    color?: textColor;
    font?: string;
    insertion?: string;
    italic?: boolean;
    obfuscated?: boolean;
    strikethrough?: boolean;
    underlined?: boolean;
}

type textColor = "black"
    | "dark_blue"
    | "dark_green"
    | "dark_aqua"
    | "dark_red"
    | "dark_purple"
    | "gold"
    | "gray"
    | "dark_gray"
    | "blue"
    | "green"
    | "aqua"
    | "red"
    | "light_purple"
    | "yellow"
    | "white";

