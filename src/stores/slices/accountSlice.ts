import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AccountState {
    accountId: string | null;
    username: string | null;
    twitchId: string | null;
    accessToken: string | null
    refreshToken: string | null
    twitchTokenExpiresAt: number | null
}

const initialState: AccountState = {
    accountId: null,
    username: null,
    twitchId: null,
    accessToken: null,
    refreshToken: null,
    twitchTokenExpiresAt: null
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccountId: (state: AccountState, action: PayloadAction<string>) => {
            state.accountId = action.payload
        },
        setTwitchId: (state: AccountState, action: PayloadAction<string>) => {
            state.twitchId = action.payload
        },
        setUsername: (state: AccountState, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setAccessToken: (state: AccountState, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
        setRefreshToken: (state: AccountState, action: PayloadAction<string>) => {
            state.refreshToken = action.payload
        },
        setTokenExpiresAt: (state: AccountState, action: PayloadAction<number>) => {
            state.twitchTokenExpiresAt = action.payload
        },
        loadAccountFromLocalStorage: (state: AccountState) => {
            state.accountId = localStorage.getItem('accountId')
            state.username = localStorage.getItem('username')
            state.twitchId = localStorage.getItem('twitchId')
            state.accessToken = localStorage.getItem('twitchAccessToken')
            state.refreshToken = localStorage.getItem('twitchRefreshToken')
            state.twitchTokenExpiresAt = Number(localStorage.getItem('twitchTokenExpiresAt'))
        },
        logout: (state: AccountState) => {
            state.accountId = null
            state.username = null
            state.twitchId = null
            state.accessToken = null
            state.refreshToken = null
            state.twitchTokenExpiresAt = null
            localStorage.removeItem('accountId')
            localStorage.removeItem('username')
            localStorage.removeItem('twitchId')
            localStorage.removeItem('twitchAccessToken')
            localStorage.removeItem('twitchRefreshToken')
            localStorage.removeItem('twitchTokenExpiresAt')
        }
    }
})

export default accountSlice.reducer