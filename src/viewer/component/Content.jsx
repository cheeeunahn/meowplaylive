import React, { useState } from 'react';
import { css } from '@emotion/css';

import { CommonBox, commonSizes, commonColors, CommonButton } from './Common';
import { CatScreen } from './CatScreen';
import { RecorderDialog } from './RecorderDialog';
import { DonationDialog } from './DonationDialog';

const PointStatus = ({ currentPoint }) => (
    <div className={css({
        marginBottom: '1rem'
    })}>
        I have:&nbsp;
        <span className={css({
            color: commonColors.green
        })}>
            {currentPoint.toLocaleString('en', { useGrouping: true })} Points
        </span>
    </div>
);

const RecordButton = ({ onClick }) => (
    <CommonButton
        className={css({
            flex: '0.5',
            marginRight: '2rem'
        })}
        buttonColor={commonColors.blue}
        onClick={onClick}
    >
        ⏺️ Record new message
    </CommonButton>
);

const SendButton = ({ isDisabled, onClick }) => (
    <CommonButton
        className={css({
            flex: '0.5'
        })}
        buttonColor={commonColors.pink}
        isDisabled={isDisabled}
        onClick={onClick}
    >
        🐱 Send to cat
    </CommonButton>
);

export const Content = () => {
    const [isRecorderDialogOpen, setRecorderDialogOpen] = useState(false);
    const [isDonationDialogOpen, setDonationDialogOpen] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);

    return (
        <CommonBox className={css({
            display: 'flex',
            flexDirection: 'column',
            width: commonSizes.appWidth,
            maxWidth: '100%',
            height: '100%'
        })}>
            <PointStatus currentPoint={500000} />
            <CatScreen />
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            })}>
                <RecordButton onClick={() => {
                    setRecorderDialogOpen(true);
                }} />
                <SendButton isDisabled={!audioBlob} onClick={() => {
                    setDonationDialogOpen(true);
                }} />
            </div>
            <RecorderDialog
                isOpen={isRecorderDialogOpen}
                onClose={() => {
                    setRecorderDialogOpen(false);
                }}
                setAudioBlob={setAudioBlob}
            />
            <DonationDialog
                audioBlob={audioBlob}
                isOpen={isDonationDialogOpen}
                onClose={() => {
                    setDonationDialogOpen(false);
                }}
            />
        </CommonBox>
    );
};
