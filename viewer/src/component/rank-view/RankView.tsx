import React, { useEffect, useState } from 'react';
import { css, cx, keyframes } from '@emotion/css';

import { CommonBox, moreCommonColors } from 'component/Common';
import { socket } from 'common/Connection';

const rankerAnimation = keyframes({
    '0%': {
        opacity: 0
    },
    '100%': {
        opacity: 1
    }
});

const rankerStyle = css({
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    marginTop: '1.1rem',
    //marginBottom: '0.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    animation: `${rankerAnimation} 1 1s`
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
    marginBottom: '0.8rem',
    color: '#ffffff',
    backgroundColor: highRankerColors[rank],
    fontStyle: 'bold',
    boxShadow: '3px 3px 1px grey'
}]);

export const RankView = () => {
    const [sortedDonationSums, setSortedDonationSums] = useState<Array<{ nickname: string, donation: number }>>([]);

    // When this component is rendered...
    useEffect(() => {
        // When the server sends the data...
        socket.on('donation-sum-map', (donationSumMap: Record<string, number>) => {
            console.log('[RankView] Updating the ranks...');

            const sortedDonationSums = Object.keys(donationSumMap).map(nickname =>
                ({ nickname: nickname, donation: donationSumMap[nickname] })
            );

            sortedDonationSums.sort((item1, item2) =>
                (donationSumMap[item2.nickname] - donationSumMap[item1.nickname])
            );

            setSortedDonationSums(sortedDonationSums);
        });

        // At the first time...
        console.log('[RankView] Requesting the donation data...');
        socket.emit('donation-sum-map');
    }, []);

    return (
        <CommonBox className={css({
            flex: 1,
            backgroundColor: 'white',
            opacity: 0.9
            //marginTop: '1rem'
        })}>
            <div className={css({
                textAlign: 'center',
                width: '100%',
                marginBottom: '1.9rem',
                fontSize: '1.45rem',
                fontWeight: 'bold'
            })}>
                Donation Leaderboard
            </div>
            {sortedDonationSums.filter((item, index) => (index < 15)).map(({ nickname, donation }, index) => (
                // If the ranking (= index) of the user is changed, draw this div again and show the simple animation.
                <div key={`${index}-${nickname}`} className={css([
                    rankerStyle,
                    (index < highRankerColors.length) && highRankerStyle(index)
                ])}>
                    <span className={css({ width: '2rem' })}>{index + 1}</span> {nickname}
                    {(index < highRankerColors.length) && <i className={cx('fa', 'fa-star', css({ marginLeft: 'auto' }))} />}
                </div>
            ))}
        </CommonBox>
    );
};
