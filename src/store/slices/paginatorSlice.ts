import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../index';

interface InitialState {
    currentPageIndex: number
}

const initialState: InitialState = { currentPageIndex: 1 };

const paginatorSlice = createSlice({
    name: 'paginator',
    initialState,
    reducers: {
        incrementPageIndex(state, {payload: limit}) {
            state.currentPageIndex+1 <= limit && state.currentPageIndex++;
        },
        decrementPageIndex(state) {
            state.currentPageIndex-1 > 0 && state.currentPageIndex--;
        }
    }
});

export const { incrementPageIndex, decrementPageIndex } = paginatorSlice.actions;

export const paginatorSelector = (state: RootState) => state.paginator;

export default paginatorSlice.reducer;
