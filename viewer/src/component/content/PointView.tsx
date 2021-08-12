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
            marginBottom: '1rem'
        })}>
            I have:&nbsp;
            <span className={css({
                color: commonColors.green
            })}>
                <div
                    // Re-render the element when the point is changed to make the animation starting again.
                    key={availablePoint}
                    className={css({
                        display: 'inline-block',
                        animation: `${pointAnimation} 1 0.5s`
                    })}
                >
                    {numberToFormattedString(availablePoint)}
                </div>
                &nbsp;Points
            </span>
        </div>
    );
};
