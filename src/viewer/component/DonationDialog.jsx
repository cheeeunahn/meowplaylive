import React, { useState } from 'react';
import { css } from '@emotion/css';

import { CommonModal, CommonBox, CommonCloseButton, CommonSlider, commonColors, CommonButton } from './Common';
import { playAudioBlob } from '../core/Recorder';

const moneyList = [
    1000,
    2000,
    5000,
    10000,
    20000,
    50000,
    100000,
    200000,
    300000,
    400000,
    500000
];

export const DonationDialog = ({ audioBlob, isOpen, onClose }) => {
    const [moneyLevel, setMoneyLevel] = useState(0);
    const money = moneyList[moneyLevel];

    return (
        <CommonModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <CommonBox className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem 1.5rem'
            })}>
                <div className={css({
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '3rem'
                })}>
                    <span className={css({
                        marginRight: '5rem'
                    })}>
                        Select the amount of donation
                        <br />
                        You would like to make
                    </span>
                    <CommonCloseButton onClick={onClose} />
                </div>
                <div className={css({
                    height: '3rem',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                })}>
                    {money.toLocaleString('en', { useGrouping: true })}
                </div>
                <CommonSlider
                    sliderColor={commonColors.green}
                    showMark={false}
                    value={moneyLevel}
                    max={10}
                    onChange={value => {
                        setMoneyLevel(value);
                    }}
                />
                <CommonButton
                    className={css({
                        display: 'block',
                        width: '12rem',
                        marginTop: '0.5rem'
                    })}
                    onClick={() => {
                        playAudioBlob(audioBlob);
                    }}
                >
                    Send!
                </CommonButton>
            </CommonBox>
        </CommonModal>
    );
};
