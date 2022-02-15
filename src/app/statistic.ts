export interface DailyStatistic {
    date: Date;
    transactionCount: number;
}

export interface DailyStatisticResponse {
    err: string;
    result: DailyStatistic[];
}

export interface MarketStatResponse {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

export interface CoinResponse {
    market_data: {
        total_supply: number;
        circulating_supply: number;
        last_updated: Date;
    };
}