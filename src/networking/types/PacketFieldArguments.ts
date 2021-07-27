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

export interface PlayerInfoPlayerProperty {
    Name: string;
    Value: string;
    IsSigned: boolean;
    Signature?: string;
}

export interface StatisticsStatistic {
    CategoryID: number;
    StatisticID: number;
    Value: number;
}
