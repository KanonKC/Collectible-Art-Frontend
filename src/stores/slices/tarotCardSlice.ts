import { getTarotCardsCollection } from "@/service/TarotCard.service";
import { TarotCard } from "@/types/TarotCard.type";
import { createSlice, PayloadAction, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export interface TarotCardState {
    majorCards: TarotCard[];
    isLoading: boolean;
}

const initialState: TarotCardState = {
    majorCards: [],
    isLoading: false,
}

const tarotCardSlice = createSlice({
    name: 'tarotCard',
    initialState,
    reducers: {
        setMajorCards: (state: TarotCardState, action: PayloadAction<TarotCard[]>) => {
            state.majorCards = action.payload
            localStorage.setItem('majorCard', JSON.stringify(action.payload))
        },
        setIsLoading: (state: TarotCardState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        saveMajorCardToLocalStorage: (state: TarotCardState) => {
            localStorage.setItem('majorCard', JSON.stringify(state.majorCards))
        },
        loadMajorCardFromLocalStorage: (state: TarotCardState) => {
            state.majorCards = JSON.parse(localStorage.getItem('majorCard') || '[]')
        }
    },
})

export async function loadTarotCardsCollection(
    dispatch: ThunkDispatch<{
        tarotCard: TarotCardState;
    }, undefined, UnknownAction>,
    accountId: string
) {
    dispatch({ type: 'tarotCard/setIsLoading', payload: true })

    try {
        const response = await getTarotCardsCollection(accountId)
        dispatch({ type: 'tarotCard/setMajorCards', payload: response.data.majorCards })
    } catch (error) {
        console.error(error)
        dispatch({ type: 'tarotCard/loadMajorCardFromLocalStorage' })
        return
    }

    dispatch({ type: 'tarotCard/setIsLoading', payload: false })
}

export default tarotCardSlice.reducer