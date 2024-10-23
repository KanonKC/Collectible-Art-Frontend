import { createShoutoutWithClipSettings, getShoutoutWithClipSettings, updateShoutoutWithClipSettings } from "@/service/ShoutoutWithClip.service";
import { ShoutoutWithClip } from "@/types/ShoutoutWithClip.type";
import { createSlice, PayloadAction, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface ShoutoutWithClipState {
    isLoading: boolean;
    accountId: string | null;
    featuredClipPriority: boolean;
    isEnabled: boolean;
    key: string;
}

const initialState: ShoutoutWithClipState = {
    isLoading: false,
    accountId: null,
    featuredClipPriority: false,
    isEnabled: false,
    key: ""
}

const shoutoutWithClipSlice = createSlice({
    name: 'shoutoutWithClip',
    initialState,
    reducers: {
        setIsLoading: (state: ShoutoutWithClipState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setAccountId: (state: ShoutoutWithClipState, action: PayloadAction<string>) => {
            state.accountId = action.payload
        },
        setFeaturedClipPriority: (state: ShoutoutWithClipState, action: PayloadAction<boolean>) => {
            state.featuredClipPriority = action.payload
        },
        setIsEnabled: (state: ShoutoutWithClipState, action: PayloadAction<boolean>) => {
            state.isEnabled = action.payload
        },
        setKey: (state: ShoutoutWithClipState, action: PayloadAction<string>) => {
            state.key = action.payload
        },
        setShoutoutWithClip: (state: ShoutoutWithClipState, action: PayloadAction<ShoutoutWithClip>) => {
            state.accountId = action.payload.accountId
            state.featuredClipPriority = action.payload.featuredClipPriority
            state.isEnabled = action.payload.isEnabled
            state.key = action.payload.key
        }
    },
})

export async function loadShoutoutWithClip(
    dispatch: ThunkDispatch<{
        shoutoutWithClip: ShoutoutWithClipState;
    }, undefined, UnknownAction>,
    accountId: string
) {
    // const response = await client.get('/fakeApi/todos')
    dispatch({ type: 'shoutoutWithClip/setIsLoading', payload: true })
    const response = await getShoutoutWithClipSettings(accountId)
    dispatch({ type: 'shoutoutWithClip/setShoutoutWithClip', payload: response.data })
    dispatch({ type: 'shoutoutWithClip/setIsLoading', payload: false })
}

export async function disableShoutoutWithClip(
    dispatch: ThunkDispatch<{
        shoutoutWithClip: ShoutoutWithClipState;
    }, undefined, UnknownAction>,
    state: ShoutoutWithClipState
) {
    // const response = await client.get('/fakeApi/todos')
    dispatch({ type: 'shoutoutWithClip/setIsLoading', payload: true })
    if (state.accountId === null) {
        return
    }
    const response = await getShoutoutWithClipSettings(state.accountId)
    dispatch({ type: 'shoutoutWithClip/setShoutoutWithClip', payload: response.data })
    dispatch({ type: 'shoutoutWithClip/setIsLoading', payload: false })
}

export async function enableShoutoutWithClip(
    dispatch: ThunkDispatch<{
        shoutoutWithClip: ShoutoutWithClipState;
    }, undefined, UnknownAction>,
    state: ShoutoutWithClipState
) {
    dispatch({ type: 'shoutoutWithClip/setIsLoading', payload: true })
    if (state.accountId === null) {
        return
    }
    try {
        const response = await getShoutoutWithClipSettings(state.accountId)
        dispatch({ type: 'shoutoutWithClip/setShoutoutWithClip', payload: response.data })
    } catch (error) {

        if ((error as AxiosError).response?.status === 404) {
            const response = await createShoutoutWithClipSettings(state.accountId)
            dispatch({ type: 'shoutoutWithClip/setShoutoutWithClip', payload: response.data })
        }

    }
    dispatch({ type: 'shoutoutWithClip/setIsLoading', payload: false })
}

export async function updateShoutoutWithClip(
    dispatch: ThunkDispatch<{
        shoutoutWithClip: ShoutoutWithClipState;
    }, undefined, UnknownAction>,
    state: ShoutoutWithClipState
) {
    
    if (state.accountId === null) {
        return
    }

    dispatch({ type: 'shoutoutWithClip/setIsLoading', payload: true })
    const response = await updateShoutoutWithClipSettings(state.accountId, {
        featuredClipPriority: state.featuredClipPriority
    })
    dispatch({ type: 'shoutoutWithClip/setShoutoutWithClip', payload: response.data })
    dispatch({ type: 'shoutoutWithClip/setIsLoading', payload: false })
}

export default shoutoutWithClipSlice.reducer