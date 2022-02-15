export interface Contract {
    code: string | null,
    confirmTime: number,
    gid: string,
    quotaRatio: number,
    randomDegree: number,
    responseLatency: number,
    seedCount: number,
};


// {
// "code": null,
// "confirmTime": 1,
// "gid": "00000000000000000002",
// "quotaMultiplier": 10,
// "quotaRatio": 10,
// "randomDegree": 0,
// "responseLatency": 1,
// "seedCount": 0
// }

export interface ContractResponse {
    err: string;
    contract: Contract | null;
}