export default interface SavedData {
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        x: number;
        y: number;
    };
    flying: boolean;
    inventory: Slot[];
    selectedSlot: number;
}

interface Slot {
    slot: number;
    present: boolean;
    id: number;
    count: number;
    nbt: number[];
}
