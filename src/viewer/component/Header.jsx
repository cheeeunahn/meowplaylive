import React from 'react';
import { css } from '@emotion/css';
import { commonColorMap } from './Common';

const Title = () => (
    <div className={css({
        fontSize: '2rem',
        marginBottom: '0.5rem'
    })}>
        MeowPlayLive
    </div>
);

const Subtitle = () => (
    <div>
        Play with a cat and win a chance to get heard!
    </div>
);

export const Header = () => (
    <div className={css({
        boxSizing: 'border-box',
        width: '100%',
        padding: '2rem 2rem 1rem 2rem',
        color: commonColorMap.white,
        backgroundColor: commonColorMap.black
    })}>
        <Title />
        <Subtitle />
    </div>
);
