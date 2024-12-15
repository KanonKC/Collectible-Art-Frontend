export interface LeaderboardsUserData {
    twitchUserId: string;
    twitchUsername: string;
    score: number;
    ranking: number;
    imageUrl: string;
}

export interface Leaderboards {
    leaderboards: LeaderboardsUserData[];
    targetPlayer: LeaderboardsUserData;
    text: string;
    total: number;
}