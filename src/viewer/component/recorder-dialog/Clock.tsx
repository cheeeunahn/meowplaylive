import React from 'react';
import { css } from '@emotion/css';

interface Props {
    time: number;
}

export const Clock = ({ time }: Props) => {
    const seconds = Math.floor(time);
    const minuteString = `${Math.floor(seconds / 60)}`;
    const secondString = `${seconds % 60}`.padStart(2, '0');

    return (
        <div className={css({
            height: '3rem',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
        })}>
            {minuteString}:{secondString}
        </div>
    );
};
