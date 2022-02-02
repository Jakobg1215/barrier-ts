import type NameSpace from './NameSpace';

export default class Chat {
    public constructor(private type: ChatType, private value: string, private options?: ChatOptions) {}

    public toString(): string {
        switch (this.type) {
            case ChatType.TEXT: {
                return JSON.stringify({ text: this.value, ...this.options });
            }

            case ChatType.TRANSLATE: {
                return JSON.stringify({ translate: this.value, ...this.options });
            }
        }
    }
}

export enum ChatType {
    TEXT = 'text',
    TRANSLATE = 'translate',
}

interface ChatOptions {
    with?: Chat;
    color?: TextColor | string;
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;
    clickEvent?: ClickEvent;
    hoverEvent?: HoverEvent;
    insertion?: string;
    font?: NameSpace;
}

type TextColor =
    | 'BLACK'
    | 'DARK_BLUE'
    | 'DARK_GREEN'
    | 'DARK_AQUA'
    | 'DARK_RED'
    | 'DARK_PURPLE'
    | 'GOLD'
    | 'GRAY'
    | 'DARK_GRAY'
    | 'BLUE'
    | 'GREEN'
    | 'AQUA'
    | 'RED'
    | 'LIGHT_PURPLE'
    | 'YELLOW'
    | 'WHITE';

interface ClickEvent {}

interface HoverEvent {}
