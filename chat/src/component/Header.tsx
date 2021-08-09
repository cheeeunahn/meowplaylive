import React from 'react';
import { css } from '@emotion/css';

export const Header = () => (
    <div className={css({
        width: '100%',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        fontWeight: 'bold'
    })}>
        🐱 MeowTube
    </div>
);
