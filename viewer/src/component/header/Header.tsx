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
        height: '10rem',
        paddingRight: '1rem',
        paddingBottom: '1.2rem',
        boxShadow: 'none',
        color: commonColors.white,
        backgroundColor: commonColors.purple
    })}>
        <div>
            <div className={css({
                fontSize: '3rem', 
                fontWeight: 'bold',
                letterSpacing: '0.02rem'
            })}>
                MeowPlayLive🐈
            </div>
            <div className={css({
                marginTop: '0.3rem',
                fontWeight: 'lighter',
                letterSpacing: '0.05rem'
            })}>
                Play with the cat and win a chance to get heard!
            </div>
        </div>
        <div className={css({
            marginLeft: 'auto' // Align right.
        })}>
            <NicknameEditor />
        </div>
    </CommonBox>
);
