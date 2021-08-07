import React from 'react';
import { css } from '@emotion/css';

import { CommonBox, commonColors } from 'component/Common';

export const LevelView = () => {
    return (
        <CommonBox className={css({
            textAlign: 'center',
            width: '100%'
        })}>
            <div>
                You are currently a
            </div>
            <div className={css({
                fontSize: '1.5rem',
                fontWeight: 'bold'
            })}>
                ❤️&nbsp;
                <span className={css({
                    color: commonColors.blue
                })}>
                    CAT VIEWER
                </span>
            </div>
        </CommonBox>
    );
};
