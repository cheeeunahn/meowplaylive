import React from 'react';
import { css } from '@emotion/css';

export const Header = () => (
    <div>
        <div className={css({
            fontSize: '3rem',
            fontWeight: 'bold'
        })}>
            MeowPlayLive
        </div>
        <div className={css({
            marginTop: '1rem'
        })}>
            Let's play with the cat and win a chance to get your voice heard!
        </div>
    </div>
);
