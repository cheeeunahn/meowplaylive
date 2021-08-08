import React from 'react';
import { css } from '@emotion/css';

import { CommonBox, commonColors } from 'component/Common';
import { ExitButton } from 'component/header/ExitButton';
import { NicknameEditor } from 'component/header/NicknameEditor';

export const Header = () => (
    <CommonBox className={css({
        zIndex: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        boxSizing: 'border-box',
        width: '100%',
        height: '7rem',
        paddingBottom: '1.2rem',
        boxShadow: 'none',
        color: commonColors.white,
        backgroundColor: commonColors.black
    })}>
        <div>
            <div className={css({
                fontSize: '2rem'
            })}>
                MeowPlayLive
            </div>
            <div>
                Play with a cat and win a chance to get heard!
            </div>
        </div>
        <div className={css({
            marginLeft: 'auto' // Align right.
        })}>
            <NicknameEditor />
            <ExitButton />
        </div>
    </CommonBox>
);
