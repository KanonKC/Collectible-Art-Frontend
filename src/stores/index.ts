import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import accountReducer from './slices/accountSlice'
import shoutoutWithClipReducer from './slices/shoutoutWithClipSlice'
import tarotCardReducer from './slices/tarotCardSlice'
import leaderboardsReducer from './slices/leaderboardsSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        account: accountReducer,
        shoutoutWithClip: shoutoutWithClipReducer,
        tarotCard: tarotCardReducer,
        leaderboards: leaderboardsReducer,
    }
})


// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store