import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { css } from '@emotion/css';

import { StoreProvider } from 'component/Store';
import { CommonBox, commonColors } from 'component/Common';
import { Content } from 'component/content/Content';
import { Header } from 'component/header/Header';
import { LevelView } from 'component/level-view/LevelView';
import { RankView } from 'component/rank-view/RankView';
import zIndex from '@material-ui/core/styles/zIndex';


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
                    <img className={css({
                        opacity: 0.25,
                        zIndex: -1,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '120%',
                        height: '120%'
                    })}
                        src="./assets/kitten.jpg"
                        alt="">
                    </img>
                    <CommonBox className={css({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '10rem',
                        boxShadow: 'none',
                        backgroundColor: commonColors.purple
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
                            padding: '1rem',
                            flex: 1
                        })}>
                            <Content />
                            <div className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                width: '320px',
                                marginLeft: '1rem'
                            })}>
                                <RankView />
                            </div>
                        </div>
                    </div>
                </div>
            </StylesProvider>
        </StoreProvider>
    );
};