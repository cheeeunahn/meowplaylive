import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';

import { CommonBox, moreCommonColors } from 'component/Common';
import { socket } from 'common/Connection';

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
            {sortedDonationSums.filter((item, index) => (index < 15)).map(({ nickname, donation }, index) => (
                <div key={`index-${nickname}-${donation}`} className={css([
                    rankerStyle,
                    (index < highRankerColors.length) && highRankerStyle(index)
                ])}>
                    <span className={css({ width: '2rem' })}>{index + 1}</span> {nickname}
                    {(index < highRankerColors.length) && <i className={cx('fa', 'fa-trophy', css({ marginLeft: 'auto' }))} />}
                </div>
            ))}
        </CommonBox>
    );
};
