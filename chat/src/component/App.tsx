import React, { useContext } from 'react';
import { css } from '@emotion/css';
import { StylesProvider } from '@material-ui/core/styles';

import { StoreContext, StoreProvider } from 'component/Store';
import { Header } from 'component/Header';
import { LandingPage } from 'component/LandingPage';
import { VideoPage } from 'component/VideoPage';

const CurrentPage = () => {
    const { page } = useContext(StoreContext);

    switch (page) {
        case 'LandingPage':
            return <LandingPage />;
        case 'VideoPage':
            return <VideoPage />;
    }
};

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
                <CurrentPage />
            </div>
        </StylesProvider>
    </StoreProvider>
);
