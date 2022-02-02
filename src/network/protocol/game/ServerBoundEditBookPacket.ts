import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundEditBookPacket implements ServerBoundPacket<GamePacketListener> {
    private static readonly TITLE_MAX_CHARS = 128;
    private static readonly PAGE_MAX_CHARS = 8192;
    private static readonly MAX_PAGES_COUNT = 200;
    public readonly slot: number;
    public readonly pages: string[] = [];
    public readonly title: string | null = null;

    public constructor(data: DataBuffer) {
        this.slot = data.readVarInt();
        const pagesCount = data.readVarInt();
        if (pagesCount > ServerBoundEditBookPacket.MAX_PAGES_COUNT) throw new Error('Got more pages then expected!');
        for (let index = 0; index < pagesCount; index++)
            this.pages.push(data.readString(ServerBoundEditBookPacket.PAGE_MAX_CHARS));
        if (data.readBoolean()) {
            this.title = data.readString(ServerBoundEditBookPacket.TITLE_MAX_CHARS);
        }
    }

    public handle(handler: GamePacketListener): void {
        handler.handleEditBook(this);
    }
}
