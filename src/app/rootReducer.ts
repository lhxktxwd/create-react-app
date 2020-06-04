import { combineReducers } from '@reduxjs/toolkit';

import TodoSlice from 'features/Todo/TodoSlice';

const rootReducer = combineReducers({
    todo: TodoSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
