import React from 'react';
import { css } from '@emotion/css';

import { CommonModal, CommonBox, CommonCloseButton } from 'component/Common';
import { RecorderView } from 'component/recorder-dialog/RecorderView';

interface RecorderDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const RecorderDialog = ({ isOpen, onClose }: RecorderDialogProps) => (
    <CommonModal
        isOpen={isOpen}
        onClose={onClose}
    >
        <CommonBox className={css({
            padding: '1rem 1.5rem'
        })}>
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '3rem',
                marginTop: '1rem'
            })}>
                <span className={css({
                    marginRight: '5rem',
                    fontSize: '1.2rem'
                })}>
                    <b>Record a voice message!</b>
                    <br />
                    (You can record up to 10 seconds.)
                </span>
                <CommonCloseButton onClick={onClose} />
            </div>
            <RecorderView onSave={() => {
                onClose();
            }} />
        </CommonBox>
    </CommonModal>
);
