import React from 'react';
import { css } from '@emotion/css';

import { CommonBox } from './Common';

export const CatScreen = () => (
    <CommonBox className={css({
        flex: 1,
        backgroundColor: 'skyblue',
        marginBottom: '1rem'
    })}>
        {/* TODO: Embed cat UI. */}
    </CommonBox>
);
