import React, { useContext } from 'react';
import { css, keyframes } from '@emotion/css';

import { commonColors } from 'component/Common';
import { StoreContext } from 'component/Store';
import { numberToFormattedString } from 'common/StringUtils';

const pointAnimation = keyframes({
    '0%': {
        transform: 'scale(1.7)',
        opacity: 0
    },
    '100%': {
        transform: 'scale(1)',
        opacity: 1
    }
});

export const PointView = () => {
    const { availablePoint } = useContext(StoreContext);

    return (
        <div className={css({
            color: commonColors.white,
            fontSize: '1rem'
        })}>
            I have:&nbsp;
            <span className={css({
                color: commonColors.white
            })}>
                <div
                    // Re-render the element when the point is changed to make the animation starting again.
                    key={availablePoint}
                    className={css({
                        display: 'inline-block',
                        animation: `${pointAnimation} 1 0.5s`
                    })}
                >
                    <b>{numberToFormattedString(availablePoint)}</b>
                </div>
                &nbsp;points
            </span>
        </div>
    );
};
