import { TokenTableItem } from "./token";

export interface Transaction {
    id: number;
    blockType: number;
    height: number;
    hash: string;
    prevHash: string;
    previousHash: string;
    accountAddress: string;
    address: string;
    publicKey: string;
    producer: string;
    fromAddress: string;
    toAddress: string;
    fromBlockHash: string;
    sendBlockHash: string;
    receiveBlockHeight: number;
    receiveBlockHash: string;
    receiveBlockHeights: string;
    tokenId: string;
    token: TokenTableItem;
    amount: number;
    fee: number;
    data: string;
    functionName: string;
    inputs: string;
    args: string;
    signature: string;
    quota: number;
    quotaByStake: number;
    quotaUsed: number;
    totalQuota: number;
    utUsed: number;
    logHash: string;
    nonce: string;
    tokenName: string;
    tokenSymbol: string;
    totalSupply: number;
    decimals: number;
    owner: string;
    tokenIndex: number;
    isReissuable: string;
    ownBurnOnly: string;
    isOwnBurnOnly: string;
    confirmedTimes: number;
    confirmations: number;
    confirmedHash: string;
    firstSnapshotHash: string;
    snapshotHash: string;
    timestamp: number;
    diffTime: number;
    status: string;
    note: string;

};


export interface PageTransaction {
    count: number,
    err: string,
    pageIdx: number,
    pageSize: number,
    accountBlocks: Transaction[]
}

export interface CompleteTransaction extends Transaction {
    triggeredSendBlockList: Transaction[];
}

export interface PageTransactionDetail {
    err: string,
    result: CompleteTransaction
}


export function transactionStatus(transaction: Transaction): string {
    if ([1, 2, 3, 6].includes(transaction.blockType) && (transaction.receiveBlockHash != null) &&
        (transaction.receiveBlockHash.length > 0) && (transaction.receiveBlockHeight > 0)) {
        return 'Closed';
    }

    if ([4, 5, 7].includes(transaction.blockType)) {
        return 'Closed';
    }

    return 'Open';
}