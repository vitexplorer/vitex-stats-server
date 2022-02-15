import { TokenTableItem } from "./token";

export interface VitexAccount {
    address: string;
    blockCount: number;
    currentQuota: number;
    lastModified: Date;
    maxQuota: number;
    stakeAmount: number;
    viteBalance: number;
};

export interface VitexAccountDetail extends VitexAccount {
    balances: VitexAccountBalancePerToken[];
}

export interface ResponseAccountDetail {
    err: string;
    result: VitexAccountDetail;
}

export interface VitexAccountPage {
    count: number;
    err: string;
    pageIdx: number;
    pageSize: number;
    accounts: VitexAccountDetail[];
}


export interface ResponseAccountBalance {
    err: string;
    result: VitexAccountBalance;
}

export interface VitexAccountBalance {
    address: string;
    blockCount: number;
    balances: VitexAccountBalancePerToken[];
}

export interface VitexAccountBalancePerToken {
    accountAddress: string;
    tokenId: string;
    balance: number;
    tokenInfo: TokenTableItem;
}

export interface VitexAccountVoter {
    address: string;
    votes: number;
    percentage: number;
}

export interface AccountBalance {
    accountAddress: string;
    balance: number;
    tokenId: string;
    tokenInfo: TokenTableItem;
}

export interface ResponseTokenAccountBalance {
    count: number;
    err: string;
    pageIdx: number;
    pageSize: number;
    balances: AccountBalance[];
}

/* show amount of VITE this account processes*/
export function getVitexAccountBalance(account: VitexAccountDetail): number {
    for (let balance of account.balances) {
        if (balance.tokenInfo.tokenName === 'VITE') {
            return balance.balance;
        }
    }
    return 0;
}