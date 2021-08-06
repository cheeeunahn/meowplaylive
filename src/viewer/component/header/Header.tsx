import React from 'react';
import { css } from '@emotion/css';

import { CommonBox, commonColors, commonSizes } from 'component/Common';
import { ExitButton } from 'component/header/ExitButton';
import { NicknameEditor } from 'component/header/NicknameEditor';

export const Header = () => (
    <CommonBox className={css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxSizing: 'border-box',
        width: '100%',
        paddingBottom: '1rem',
        borderRadius: 0,
        color: commonColors.white,
        backgroundColor: commonColors.black
    })}>
        <div className={css({
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: commonSizes.appWidth,
            maxWidth: '100%'
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
        </div>
    </CommonBox>
);
