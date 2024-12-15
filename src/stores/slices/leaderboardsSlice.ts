import {
	getLeaderboards,
	LeaderboardsType,
} from "@/service/Leaderboards.service";
import { HangedManUserData } from "@/types/HangedMan.type";
import { LeaderboardsUserData } from "@/types/Leaderboards.type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const RANK_RESET_DATE = 15;

export interface LeaderboardsState {
	type: LeaderboardsType;
	leaderboards: LeaderboardsUserData[];
	targetPlayer: LeaderboardsUserData | null;
	pageSize: number;
	currentPage: number;
	totalPage: number;
	isLoading: boolean;
	targetMonthIndex: number;
	targetYear: number;
	isDisplayAllTime: boolean;
	isFirstPage: boolean;
	isLastPage: boolean;
}

function getCurrentMonthIndex() {
	const currentDate = new Date().getDate();
	if (currentDate < RANK_RESET_DATE) {
		return new Date().getMonth() - 1;
	}
	return new Date().getMonth();
}

function getCurrentYear() {
	return new Date().getFullYear();
}

const initialState: LeaderboardsState = {
	type: "hanged-man",
	leaderboards: [],
	targetPlayer: null,
	pageSize: 8,
	currentPage: 1,
	totalPage: 1,
	isLoading: false,
	targetMonthIndex: getCurrentMonthIndex(),
	targetYear: getCurrentYear(),
	isDisplayAllTime: false,
	isFirstPage: true,
	isLastPage: true,
};

export const loadLeaderboards = createAsyncThunk(
	"leaderboards/loadLeaderboards",
	async (twitchUserId: string, { getState }) => {
		const { leaderboards: state } = getState() as {
			leaderboards: LeaderboardsState;
		};

		const startTimestamp = new Date(
			state.targetYear,
			state.targetMonthIndex,
			RANK_RESET_DATE
		).getTime();

		// Set endTimestamp to the 15th of the next month

		let endTimestamp;
		if (state.targetMonthIndex === 11) {
			endTimestamp = new Date(
				state.targetYear + 1,
				0,
				RANK_RESET_DATE
			).getTime();
		} else {
			endTimestamp = new Date(
				state.targetYear,
				state.targetMonthIndex + 1,
				RANK_RESET_DATE
			).getTime();
		}

		const response = await getLeaderboards(state.type, twitchUserId, {
			limit: state.pageSize,
			offset: (state.currentPage - 1) * state.pageSize,
			startPeroid: state.isDisplayAllTime ? undefined : startTimestamp,
			endPeroid: state.isDisplayAllTime ? undefined : endTimestamp,
		});
		return response.data;
	}
);

export const leaderboardsSlice = createSlice({
	name: "leaderboards",
	initialState,
	reducers: {
		setLeaderboards: (
			state: LeaderboardsState,
			action: PayloadAction<HangedManUserData[]>
		) => {
			state.leaderboards = action.payload;
		},
		setTargetPlayer: (
			state: LeaderboardsState,
			action: PayloadAction<HangedManUserData>
		) => {
			state.targetPlayer = action.payload;
		},
		setPageSize: (
			state: LeaderboardsState,
			action: PayloadAction<number>
		) => {
			state.pageSize = action.payload;
		},
		setCurrentPage: (
			state: LeaderboardsState,
			action: PayloadAction<number>
		) => {
			state.currentPage = action.payload;
		},
		setTotalPage: (
			state: LeaderboardsState,
			action: PayloadAction<number>
		) => {
			state.totalPage = action.payload;
		},
		setIsDisplayAllTime: (
			state: LeaderboardsState,
			action: PayloadAction<boolean>
		) => {
			state.isDisplayAllTime = action.payload;
		},
		setToPreviousMonth: (state: LeaderboardsState) => {
			if (state.targetMonthIndex === 0) {
				state.targetMonthIndex = 11;
				state.targetYear -= 1;
			} else {
				state.targetMonthIndex -= 1;
			}
		},
		setToNextMonth: (state: LeaderboardsState) => {
			if (state.targetMonthIndex === 11) {
				state.targetMonthIndex = 0;
				state.targetYear += 1;
			} else {
				state.targetMonthIndex += 1;
			}
		},
		setType: (
			state: LeaderboardsState,
			action: PayloadAction<LeaderboardsType>
		) => {
			state.type = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadLeaderboards.fulfilled, (state, action) => {
            const totalPage = Math.ceil(action.payload.total / state.pageSize);
			state.leaderboards = action.payload.leaderboards;
			state.targetPlayer = action.payload.targetPlayer;
			state.totalPage = totalPage === 0 ? 1 : totalPage;
			state.isLoading = false;
		});
		builder.addCase(loadLeaderboards.pending, (state) => {
			state.isLoading = true;
		});
		builder.addMatcher(() => true, (state) => {
			state.isFirstPage = state.currentPage === 1;
			state.isLastPage = state.currentPage === state.totalPage;
		});
	},
});

export const {
	setLeaderboards,
	setTargetPlayer,
	setPageSize,
	setCurrentPage,
	setTotalPage,
	setIsDisplayAllTime,
	setToNextMonth,
	setToPreviousMonth,
	setType,
} = leaderboardsSlice.actions;

export default leaderboardsSlice.reducer;
