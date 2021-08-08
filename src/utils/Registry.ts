import blocks from './data/blocks.json';
import entities from './data/entities.json';
import items from './data/items.json';

export default class Registry {
    private static blocks = Object.entries(blocks);
    private static items = Object.entries(items);
    private static entities = Object.entries(entities);
    public static getBlockId(block: string) {
        const blockstates: any | undefined = this.blocks.find(p => p[0] === `minecraft:${block}`)?.[1];
        if (!blockstates) return null;
        return blockstates.states.find((p: any) => p.default === true)?.id ?? null;
    }
    public static getItemId(item: string) {
        return this.items.find(p => p[0] === `minecraft:${item}`)?.[1].protocol_id ?? null;
    }
    public static getEntityId(entity: string) {
        return this.entities.find(p => p[0] === `minecraft:${entity}`)?.[1].protocol_id ?? null;
    }
}
