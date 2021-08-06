import React, { useContext } from 'react';
import { css } from '@emotion/css';

import { commonColors } from 'component/Common';
import { StoreContext } from 'component/Store';

export const PointView = () => {
    const { point } = useContext(StoreContext);

    return (
        <div className={css({
            marginBottom: '1rem'
        })}>
            I have:&nbsp;
            <span className={css({
                color: commonColors.green
            })}>
                {point.toLocaleString('en', { useGrouping: true })} Points
            </span>
        </div>
    );
};