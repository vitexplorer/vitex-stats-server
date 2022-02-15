export interface TokenTableItem {
    tokenId: string;
    tokenName: string;
    tokenSymbol: string;
    decimals: number;
    index?: number;
    isOwnerBurnOnly?: boolean;
    isReIssuable?: boolean;
    maxSupply?: number;
    totalSupply: number;
    owner: string;

};

export interface TokenInfoList {
    totalCount: number;
    tokenInfoList: TokenTableItem[];
}
