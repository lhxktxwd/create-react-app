import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { RootState } from 'app/rootReducer';

const initialState = {
    count: 0,
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        },
    },
});

export const { setCount } = todoSlice.actions;

export default todoSlice.reducer;

export const addSync = (count: number): AppThunk => async (dispatch) => {
    const result: number = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(count);
        }, 1000);
    });
    dispatch(setCount(result));
};

export const selectCount = (state: RootState) => state.todo;
