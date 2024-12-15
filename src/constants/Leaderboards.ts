import { LeaderboardsType } from "@/service/Leaderboards.service";

export const LeaderboardsTypeList: {
	value: LeaderboardsType;
	label: string;
}[] = [
	{
		value: "hanged-man",
		label: "Hanged Man",
	},
	{
		value: "math-game",
		label: "Math Game",
	},
];
