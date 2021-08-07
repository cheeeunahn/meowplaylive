import React, { useContext } from 'react';
import { css } from '@emotion/css';

import { commonColors } from 'component/Common';
import { StoreContext } from 'component/Store';
import { numberToFormattedString } from 'common/StringUtils';

export const PointView = () => {
    const { availablePoint } = useContext(StoreContext);

    return (
        <div className={css({
            marginBottom: '1rem'
        })}>
            I have:&nbsp;
            <span className={css({
                color: commonColors.green
            })}>
                {numberToFormattedString(availablePoint)} Points
            </span>
        </div>
    );
};
