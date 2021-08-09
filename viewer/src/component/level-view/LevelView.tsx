import React, { useContext } from 'react';
import { css } from '@emotion/css';

import { CommonBox, commonColors, moreCommonColors } from 'component/Common';
import { StoreContext } from 'component/Store';

interface DonationLevel {
    emoji: string;
    color: string;
    name: string;
}

const donationLevelMap: Record<string, DonationLevel> = {
    viewer: { emoji: '🐱', color: commonColors.blue, name: 'Cat viewer' },
    supporter: { emoji: '💰', color: commonColors.brown, name: 'Cat supporter' },
    enthusiast: { emoji: '🎵', color: moreCommonColors.lightBrown, name: 'Cat enthusiast' },
    lover: { emoji: '❤️', color: commonColors.green, name: 'Cat lover' },
    master: { emoji: '🔥', color: commonColors.pink, name: 'Cat master' }
};

export const LevelView = () => {
    const { usedPoint } = useContext(StoreContext);

    let donationLevel: DonationLevel;

    if (usedPoint <= 0) {
        donationLevel = donationLevelMap.viewer;
    } else if (usedPoint < 5000) {
        donationLevel = donationLevelMap.supporter;
    } else if (usedPoint < 50000) {
        donationLevel = donationLevelMap.enthusiast;
    } else if (usedPoint < 100000) {
        donationLevel = donationLevelMap.lover;
    } else {
        donationLevel = donationLevelMap.master;
    }

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
                {donationLevel.emoji}&nbsp;
                <span className={css({
                    color: donationLevel.color
                })}>
                    {donationLevel.name.toUpperCase()}
                </span>
            </div>
        </CommonBox>
    );
};
