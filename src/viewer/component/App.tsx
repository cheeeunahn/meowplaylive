import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { css } from '@emotion/css';

import { commonColors } from './Common';
import { Header } from './Header';
import { Content } from './Content';

export const App = () => {
    return (
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
                    boxSizing: 'border-box',
                    width: '100%',
                    padding: '2rem',
                    flex: 1
                })}>
                    <Content />
                </div>
            </div>
        </StylesProvider>
    );
};
