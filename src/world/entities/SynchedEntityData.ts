import type { FieldType, PacketItem } from '../../network/protocol/game/ClientBoundSetEntityDataPacket';

export default class SynchedEntitiyData {
    private readonly dataValues = new Map<number, DataValue>();
    private readonly changedValues = new Map<number, DataValue>();

    public define(index: number, type: FieldType, defaultValue: any) {
        this.dataValues.set(index, { type, data: defaultValue }); // TODO: Make it so you don't have to say what the index is
    }

    public set(index: number, value: any) {
        const data = this.dataValues.get(index);
        if (!data) throw new Error(`Index ${index} is not registered!`);
        if (data.data === value) return;
        this.dataValues.set(index, { type: data.type, data: value });
        this.changedValues.set(index, { type: data.type, data: value });
    }

    public getChangedData(): PacketItem[] {
        const dataValues: PacketItem[] = [];
        for (const [index, data] of this.changedValues.entries()) {
            dataValues.push({ index, type: data.type, value: data.data });
        }
        this.changedValues.clear();
        return dataValues;
    }

    public getData(): PacketItem[] {
        const dataValues: PacketItem[] = [];
        for (const [index, data] of this.dataValues.entries()) {
            dataValues.push({ index, type: data.type, value: data.data });
        }
        return dataValues;
    }

    public get changed() {
        return this.changedValues.size > 0;
    }
}

interface DataValue {
    type: FieldType;
    data: any;
}
