import { Leaderboards } from "@/types/Leaderboards.type";
import { baseUrl } from ".";

export type Peroid = "daily" | "weekly" | "monthly" | "alltime" | number;
export type LeaderboardsType =  "hanged-man" | "math-game"

interface GetHangedManGameLeaderboardOptions {
	startPeroid?: Peroid;
	endPeroid?: Peroid;
	offset?: number;
	limit?: number;
}

export async function getLeaderboards(
    leaderboardType: LeaderboardsType,
	twitchUserId: string,
	options?: GetHangedManGameLeaderboardOptions
) {
	return baseUrl.get<Leaderboards>(`/leaderboards/${leaderboardType}/${twitchUserId}`, {
        params: options
    });
}
