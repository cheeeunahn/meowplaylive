import React from 'react';
import { css } from '@emotion/css';

import { commonColors } from 'component/Common';
import { ExitButton } from 'component/header/ExitButton';
import { NicknameEditor } from 'component/header/NicknameEditor';

export const Header = () => (
    <div className={css({
        zIndex: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxSizing: 'border-box',
        width: '100%',
        padding: '2rem 2rem 1em 2rem',
        color: commonColors.white
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
);
