export interface Account {
    id: string;
    username: string;
    twitchId: string;
    twitchAccessToken: string | null;
    twitchRefreshToken: string | null;
    twitchTokenExpiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}