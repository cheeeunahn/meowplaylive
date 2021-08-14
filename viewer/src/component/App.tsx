import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { css } from '@emotion/css';

import { StoreProvider } from 'component/Store';
import { CommonBox, commonColors } from 'component/Common';
import { Content } from 'component/content/Content';
import { Header } from 'component/header/Header';
import { LevelView } from 'component/level-view/LevelView';
import { RankView } from 'component/rank-view/RankView';


export const App = () => {
    return (
        <StoreProvider>
            <StylesProvider injectFirst={true}>
                <div className={css({
                    position: 'relative',
                    overflow: 'auto',
                    width: '100%',
                    height: '100%'
                })}>
                    <CommonBox className={css({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '7rem',
                        boxShadow: 'none',
                        backgroundColor: commonColors.black
                    })}>
                        {/* Put nothing */}
                    </CommonBox>
                    <div className={css({
                        display: 'inline-flex',
                        flexDirection: 'column',
                        color: commonColors.black
                    })}>
                        <Header />
                        <div className={css({
                            display: 'flex',
                            flexDirection: 'row',
                            boxSizing: 'border-box',
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
                                <RankView />
                            </div>
                        </div>
                    </div>
                </div>
            </StylesProvider>
        </StoreProvider>
    );
};