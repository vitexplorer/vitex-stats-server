export interface Snapshot {
    'hash': string,
    'height': number,
    'prevHash': string,
    'producer': string;
    'publicKey': string,
    'signature': string,
    'snapshotData': SnapshotData[] | null,
    'timestamp': number
    'version': number,
};


export interface SnapshotData {
    height: number;
    hash: string;
    accountAddress: string;
    snapshotBlockHash: string;
}


export interface PageSnapshot {
    count: number,
    err: string,
    pageIdx: number,
    pageSize: number,
    snapshotBlocks: Snapshot[]
}