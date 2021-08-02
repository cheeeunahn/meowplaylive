import React from 'react';
import { StylesProvider } from '@material-ui/core';
import { css } from '@emotion/css';

import { Header } from './Header';
import { commonPalette } from './Common';

const Content = () => (
    <div className={css({
        width: '100%',
        flex: 1
    })}>

    </div>
);

export const App = () => {
    return (
        <StylesProvider injectFirst={true}>
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                color: commonPalette.black
            })}>
                <Header />
                <Content />
            </div>
        </StylesProvider>
    );
};
