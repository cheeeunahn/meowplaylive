import React from 'react';
import { css, cx } from '@emotion/css';

import { CommonBox, moreCommonColors } from 'component/Common';

// TODO: Will be replaced to DB.
const dummyNames: string[] = [];

for (let i = 0; i < 20; i++) {
    dummyNames.push(`Nickname ${i}`);
}

const rankerStyle = css({
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    marginBottom: '0.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem'
});

const highRankerColors = [
    moreCommonColors.yellow,
    moreCommonColors.gray,
    moreCommonColors.lightBrown
];

const highRankerStyle = (rank: number) => css([rankerStyle, {
    borderRadius: '0.5rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    color: '#ffffff',
    backgroundColor: highRankerColors[rank]
}]);

export const RankView = () => (
    <CommonBox className={css({
        flex: 1,
        marginTop: '1rem'
    })}>
        <div className={css({
            textAlign: 'center',
            width: '100%',
            marginBottom: '1rem',
            fontSize: '1.2rem',
            fontWeight: 'bold'
        })}>
            DONATION LEADERBOARD
        </div>
        {dummyNames.filter((name, index) => (index < 15)).map((name, index) => (
            <div key={`index-${name}`} className={css([
                rankerStyle,
                (index < highRankerColors.length) && highRankerStyle(index)
            ])}>
                <span className={css({ width: '2rem' })}>{index + 1}</span> {name}
                {(index < highRankerColors.length) && <i className={cx('fa', 'fa-trophy', css({ marginLeft: 'auto' }))} />}
            </div>
        ))}
    </CommonBox>
);
