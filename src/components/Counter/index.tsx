import React, { FC } from 'react';
import './index.less';
import styles from './index.module.less';

interface Props {
    num: number;
}

const Counter: FC<Props> = ({ num }) => (
    <div className="test">
        <span className={styles.red}>{num}</span>{' '}
    </div>
);

export default Counter;
