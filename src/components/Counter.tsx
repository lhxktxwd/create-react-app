import React, { FC } from 'react';

interface Props {
    num: number;
}

const Counter: FC<Props> = ({ num }) => <div>{num} </div>;

export default Counter;
