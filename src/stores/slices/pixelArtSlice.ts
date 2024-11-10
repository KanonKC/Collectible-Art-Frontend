import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PixelArtState {
    selectedColor: string;
    isMouseDownOnPanel: boolean;
    isLoading: boolean;
}

const initialState: PixelArtState = {
    selectedColor: '#000000',
    isMouseDownOnPanel: false,
    isLoading: false,
}

const pixelArtSlice = createSlice({
    name: 'pixelArt',
    initialState,
    reducers: {
        setSelectedColor: (state: PixelArtState, action: PayloadAction<string>) => {
            state.selectedColor = action.payload
        },
        setIsLoading: (state: PixelArtState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setIsMouseDownOnPanel: (state: PixelArtState, action: PayloadAction<boolean>) => {
            state.isMouseDownOnPanel = action.payload
        }
    },
})

export default pixelArtSlice.reducer