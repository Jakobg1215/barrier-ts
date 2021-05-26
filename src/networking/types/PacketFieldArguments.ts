export interface PlayerInfoPlayer {
    UUID: string;
    Name?: string;
    NumberOfProperties?: number;
    Property?: PlayerInfoPlayerProperty[];
    Gamemode?: number;
    Ping?: number;
    HasDisplayName?: boolean;
    DisplayName?: string;
}

interface PlayerInfoPlayerProperty {
    Name: string;
    Value: string;
    IsSigned: boolean;
    Signature?: string;
}
