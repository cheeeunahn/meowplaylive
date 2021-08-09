import React from 'react';
import { css } from '@emotion/css';

import { CommonBox } from 'component/Common';

export const ChatWidget = () => {
    return (
        <CommonBox className={css({
            display: 'inline-block',
            width: '25rem',
            height: '30rem'
        })}>

        </CommonBox>
    );
};
