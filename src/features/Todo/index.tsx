import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Counter from 'components/Counter';
import { setCount, addSync } from 'features/Todo/TodoSlice';
import { RootState } from 'app/rootReducer';
import Chart from 'components/Chart';
import { Button } from 'antd';

interface Props {
    count: number;
    addCount: (num: number) => void;
    addCountSync: (num: number) => void;
}

const Todo: FC<Props> = () => {
    const { count } = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch();

    const addCount = (num: number) => {
        dispatch(setCount(num));
    };
    const addCountSync = (num: number) => {
        dispatch(addSync(num));
    };
    return (
        <div>
            <Counter num={count} />
            <Chart type={'barDiagram'} data={[]} />
            <Button>button</Button>
            <button onClick={() => addCount(count + 1)}>add</button>
            <button onClick={() => addCountSync(count + 1)}>addAsync</button>
        </div>
    );
};
export default Todo;
