import React, { useState } from 'react';
import { css, cx } from '@emotion/css';

import { CommonBox, commonSizes, commonColors, CommonButton } from './Common';
import { CatScreen } from './CatScreen';
import { RecorderDialog } from './RecorderDialog';
import { DonationDialog } from './DonationDialog';

interface PointStatusProps {
    currentPoint: number;
}

const PointStatus = ({ currentPoint }: PointStatusProps) => (
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

interface RecordButtonProps {
    onClick: () => void;
}

const RecordButton = ({ onClick }: RecordButtonProps) => (
    <CommonButton
        className={css({
            display: 'flex',
            flex: '0.5',
            alignItems: 'baseline',
            marginRight: '2rem'
        })}
        buttonColor={commonColors.blue}
        onClick={onClick}
    >
        <i className='fa fa-circle' />
        &nbsp;Record new message
    </CommonButton>
);

interface SendButtonProps {
    isDisabled: boolean;
    onClick: () => void;
}

const SendButton = ({ isDisabled, onClick }: SendButtonProps) => (
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
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

    return (
        <CommonBox className={css({
            display: 'flex',
            flexDirection: 'column',
            width: commonSizes.appWidth,
            maxWidth: '100%'
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
                audioBlob={audioBlob!!}
                isOpen={isDonationDialogOpen}
                onClose={() => {
                    setDonationDialogOpen(false);
                }}
            />
        </CommonBox>
    );
};
