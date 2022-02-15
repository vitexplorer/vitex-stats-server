export interface SBP {
    blockProducingAddress: string;
    expirationHeight: number;
    expirationTime: number;
    name: string;
    revokeTime: number;
    stakeAddress: string;
    stakeAmount: number;
    votes: number | null;
    rank: number | null;

    reward: SBPReward | null;
};


export interface SBPReward {
    allRewardWithdrawed: boolean;
    blockProducingReward: number;
    producedBlocks: number;
    targetBlocks: number;
    totalReward: number;
    votingReward: number;
}

export interface SBPVoting {
    blockProducerName: string;
    status: number;
    votes: number;
}

export interface SBPVotingResponse {
    err: string;
    sbp: SBPVoting;
}

export function SBPOnlineRate(sbp: SBP): number {
    if (sbp.reward == null) {
        return 0;
    }

    return 1.0 * sbp.reward.producedBlocks / sbp.reward.targetBlocks;
}