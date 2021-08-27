import React, { useContext, useState } from 'react';
import { css } from '@emotion/css';

import { StoreContext } from 'component/Store';
import { CommonBox, CommonButton, commonColors } from 'component/Common';
import { CatScreen } from 'component/content/CatScreen';
import { PointView } from 'component/content/PointView';
import { DonationDialog } from 'component/donation-dialog/DonationDialog';
import { RecorderDialog } from 'component/recorder-dialog/RecorderDialog';

export const Content = () => {
    const { voiceBlob, nickname } = useContext(StoreContext);

    const [isRecorderDialogOpen, setRecorderDialogOpen] = useState(false);
    const [isDonationDialogOpen, setDonationDialogOpen] = useState(false);

    return (
        <CommonBox className={css({
            display: 'flex',
            flexDirection: 'column',
            width: '720px',
            maxWidth: '100%',
            padding: '1.5rem',
            backgroundColor: 'white',
            opacity: 0.9
        })}>
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'right',
                alignItems: 'flex-end'
            })}>
                <CommonButton
                    className={css({
                        display: 'flex',
                        flex: '0.2',
                        marginRight: '0.5rem',
                        marginBottom: '1rem'
                    })}
                    buttonColor={commonColors.darkblue}
                    onClick={() => {
                        if (nickname.length === 0) {
                            alert('Please set your nickname.');
                        } else {
                            setRecorderDialogOpen(true);
                        }
                    }}
                >
                    <i className='fa fa-circle' />&nbsp;Record
                </CommonButton>
            </div>
            <CatScreen />
            <div>
                <PointView />
            </div>
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            })}>
                <CommonButton
                    className={css({
                        flex: '1',
                        fontSize: '1.3rem',
                        height: '4rem'
                    })}
                    buttonColor={commonColors.pink}
                    isDisabled={!voiceBlob}
                    onClick={() => {
                        setDonationDialogOpen(true);
                    }}
                >
                    <i className="fa fa-paw"></i>&nbsp;Send to cat
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
