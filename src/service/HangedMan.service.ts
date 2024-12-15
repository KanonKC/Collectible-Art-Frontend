import { leaderboards } from "@/types/HangedMan.type";
import { baseUrl } from ".";

export type Peroid = "daily" | "weekly" | "monthly" | "alltime" | number;

interface GetHangedManGameLeaderboardOptions {
	startPeroid?: Peroid;
	endPeroid?: Peroid;
	offset?: number;
	limit?: number;
}

export async function getleaderboards(
	twitchUserId: string,
	options?: GetHangedManGameLeaderboardOptions
) {
	return baseUrl.get<leaderboards>("/hanged-man-game/leaderboard", {
        params: {
            twitchUserId,
            ...options
        }
    });
}
