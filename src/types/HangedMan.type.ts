export interface HangedManUserData {
    twitchUserId: string;
    twitchUsername: string;
    score: number;
    ranking: number;
    imageUrl: string;
}

export interface leaderboards {
    leaderboards: HangedManUserData[];
    targetPlayer: HangedManUserData;
    total: number;
}