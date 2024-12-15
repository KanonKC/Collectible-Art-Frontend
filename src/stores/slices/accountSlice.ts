import { getCustomPoint } from "@/service/CustomPoint.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccountState {
	accountId: string | null;
	username: string | null;
	twitchId: string | null;
	accessToken: string | null;
	refreshToken: string | null;
	twitchTokenExpiresAt: number | null;
	customPoint: number;
    imageUrl: string | null;
    isLoggedIn: boolean;
}

const initialState: AccountState = {
	accountId: null,
	username: null,
	twitchId: null,
	accessToken: null,
	refreshToken: null,
	twitchTokenExpiresAt: null,
	customPoint: 0,
    imageUrl: null,
    isLoggedIn: false
};

export const loadAccount = createAsyncThunk(
	"account/loadAccount",
	async (_, { getState }) => {
		const state = getState() as { account: AccountState };

		const { data: customPoint } = await getCustomPoint(
			state.account.twitchId!
		);
		return customPoint;
	}
);

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		setAccountId: (state: AccountState, action: PayloadAction<string>) => {
			state.accountId = action.payload;
		},
		setTwitchId: (state: AccountState, action: PayloadAction<string>) => {
			state.twitchId = action.payload;
		},
		setUsername: (state: AccountState, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setAccessToken: (
			state: AccountState,
			action: PayloadAction<string>
		) => {
			state.accessToken = action.payload;
		},
		setRefreshToken: (
			state: AccountState,
			action: PayloadAction<string>
		) => {
			state.refreshToken = action.payload;
		},
		setTokenExpiresAt: (
			state: AccountState,
			action: PayloadAction<number>
		) => {
			state.twitchTokenExpiresAt = action.payload;
		},
		loadAccountFromLocalStorage: (state: AccountState) => {
			state.accountId = localStorage.getItem("accountId");
			state.username = localStorage.getItem("username");
			state.twitchId = localStorage.getItem("twitchId");
			state.accessToken = localStorage.getItem("twitchAccessToken");
			state.refreshToken = localStorage.getItem("twitchRefreshToken");
			state.twitchTokenExpiresAt = Number(
				localStorage.getItem("twitchTokenExpiresAt")
			);
            state.imageUrl = localStorage.getItem("twitchImageUrl");
		},
		logout: (state: AccountState) => {
			state.accountId = null;
			state.username = null;
			state.twitchId = null;
			state.accessToken = null;
			state.refreshToken = null;
			state.twitchTokenExpiresAt = null;
			localStorage.removeItem("accountId");
			localStorage.removeItem("username");
			localStorage.removeItem("twitchId");
			localStorage.removeItem("twitchAccessToken");
			localStorage.removeItem("twitchRefreshToken");
			localStorage.removeItem("twitchTokenExpiresAt");
            localStorage.removeItem("twitchImageUrl");
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadAccount.pending, () => {
			//
		});
		builder.addCase(loadAccount.fulfilled, (state, action) => {
            if (action.payload) {
                state.customPoint = action.payload.point;
            }
		});
        // Always change isLoggedIn to true when account id not null
        builder.addDefaultCase(
            (state) => {
                state.isLoggedIn = !!(state.username || state.twitchId)
            }
        )
	},

});

export default accountSlice.reducer;
