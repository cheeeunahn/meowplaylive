import React from 'react';
import { css } from '@emotion/css';

import { Header } from './Header';

const Content = () => (
    <div className={css({
        width: '100%',
        flex: 1
    })}>

    </div>
);

export const App = () => {
    return (
        <div className={css({
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%'
        })}>
            <Header />
            <Content />
        </div>
    );
};
