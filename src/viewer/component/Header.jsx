import React from 'react';
import { css } from '@emotion/css';

import { CommonButton, CommonBox, commonColors, commonSizes } from './Common';

const Title = () => (
    <div className={css({
        fontSize: '2rem'
    })}>
        MeowPlayLive
    </div>
);

const Subtitle = () => (
    <div className={css({
        display: 'flex',
        width: commonSizes.appWidth,
        maxWidth: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    })}>
        Play with a cat and win a chance to get heard!
        <CommonButton
            className={css({
                alignItems: 'baseline',
                marginLeft: 'auto' // Align right.
            })}
            buttonColor={commonColors.brown}
            onClick={() => {
                location.href = '../index.html';
            }}
        >
            <i className="fa fa-arrow-left" />&nbsp;Exit
        </CommonButton>
    </div>
);

export const Header = () => (
    <CommonBox className={css({
        boxSizing: 'border-box',
        width: '100%',
        paddingBottom: '1rem',
        borderRadius: 0,
        color: commonColors.white,
        backgroundColor: commonColors.black
    })}>
        <Title />
        <Subtitle />
    </CommonBox>
);
