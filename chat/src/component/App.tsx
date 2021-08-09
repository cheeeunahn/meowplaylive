import React from 'react';
import { css } from '@emotion/css';
import { StylesProvider } from '@material-ui/core/styles';

import { StoreProvider } from 'component/Store';
import { Header } from 'component/Header';
import { LandingPage } from 'component/LandingPage';

export const App = () => (
    <StoreProvider>
        <StylesProvider injectFirst={true}>
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
                padding: '1rem'
            })}>
                <Header />
                <LandingPage />
            </div>
        </StylesProvider>
    </StoreProvider>
);
