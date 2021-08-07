import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { css } from '@emotion/css';

import { StoreProvider } from 'component/Store';
import { commonColors } from 'component/Common';
import { Content } from 'component/content/Content';
import { Header } from 'component/header/Header';
import { LevelView } from 'component/level-view/LevelView';

export const App = () => {
    return (
        <StoreProvider>
            <StylesProvider injectFirst={true}>
                <div className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    color: commonColors.black
                })}>
                    <Header />
                    <div className={css({
                        display: 'flex',
                        flexDirection: 'row',
                        boxSizing: 'border-box',
                        width: '100%',
                        padding: '2rem',
                        flex: 1
                    })}>
                        <Content />
                        <div className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            width: '300px',
                            marginLeft: '1rem'
                        })}>
                            <LevelView />
                        </div>
                    </div>
                </div>
            </StylesProvider>
        </StoreProvider>
    );
};
