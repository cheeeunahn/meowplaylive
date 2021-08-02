import React from 'react';
import { css } from '@emotion/css';

import { CommonButton, CommonCard, commonPalette } from './Common';

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
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    })}>
        Play with a cat and win a chance to get heard!
        <CommonButton
            className={css({
                marginLeft: 'auto', // Align right.
            })}
            buttonColor={commonPalette.brown}
        >
            ⬅️ Exit
        </CommonButton>
    </div>
);

export const Header = () => (
    <CommonCard className={css({
        boxSizing: 'border-box',
        width: '100%',
        paddingBottom: '1rem',
        borderRadius: 0,
        color: commonPalette.white,
        backgroundColor: commonPalette.black
    })}>
        <Title />
        <Subtitle />
    </CommonCard>
);
