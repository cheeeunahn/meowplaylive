import React, { useContext, useState } from 'react';
import { css } from '@emotion/css';

import { StoreContext } from 'component/Store';
import { CommonBox, commonSizes, CommonButton, commonColors } from 'component/Common';
import { CatScreen } from 'component/content/CatScreen';
import { PointView } from 'component/content/PointView';
import { DonationDialog } from 'component/donation-dialog/DonationDialog';
import { RecorderDialog } from 'component/recorder-dialog/RecorderDialog';

export const Content = () => {
    const { voiceRecorder, voiceBlob } = useContext(StoreContext);
    const [isRecorderDialogOpen, setRecorderDialogOpen] = useState(false);
    const [isDonationDialogOpen, setDonationDialogOpen] = useState(false);

    return (
        <CommonBox className={css({
            display: 'flex',
            flexDirection: 'column',
            width: commonSizes.appWidth,
            maxWidth: '100%'
        })}>
            <PointView />
            <CatScreen />
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            })}>
                <CommonButton
                    className={css({
                        display: 'flex',
                        flex: '0.5',
                        alignItems: 'baseline',
                        marginRight: '2rem'
                    })}
                    buttonColor={commonColors.blue}
                    isDisabled={!voiceRecorder}
                    onClick={() => {
                        setRecorderDialogOpen(true);
                    }}
                >
                    <i className='fa fa-circle' />
                    &nbsp;
                    {voiceRecorder ? 'Record new message' : 'Loading the recorder...'}
                </CommonButton>
                <CommonButton
                    className={css({
                        flex: '0.5'
                    })}
                    buttonColor={commonColors.pink}
                    isDisabled={!voiceBlob}
                    onClick={() => {
                        setDonationDialogOpen(true);
                    }}
                >
                    🐱 Send to cat
                </CommonButton>
            </div>
            <RecorderDialog
                isOpen={isRecorderDialogOpen}
                onClose={() => {
                    setRecorderDialogOpen(false);
                }}
            />
            <DonationDialog
                isOpen={isDonationDialogOpen}
                onClose={() => {
                    setDonationDialogOpen(false);
                }}
            />
        </CommonBox>
    );
};