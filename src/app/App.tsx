import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import Todo from 'features/Todo';
import { setCount, addSync } from 'features/Todo/TodoSlice';

const App = () => {
    const dispatch = useDispatch();
    const { count } = useSelector((state: RootState) => state.todo);

    const addCount = (num: number) => {
        dispatch(setCount(num));
    };
    const addCountSync = (num: number) => {
        dispatch(addSync(num));
    };

    return <Todo count={count} addCount={addCount} addCountSync={addCountSync} />;
};

export default App;
