import React, { FC } from 'react';
import Counter from 'components/Counter';

interface Props {
    count: number;
    addCount: (num: number) => void;
    addCountSync: (num: number) => void;
}

const Todo: FC<Props> = ({ count, addCount, addCountSync }) => (
    <div>
        <Counter num={count} />
        <button onClick={() => addCount(count + 1)}>add</button>
        <button onClick={() => addCountSync(count + 1)}>addAsync</button>
    </div>
);
export default Todo;
