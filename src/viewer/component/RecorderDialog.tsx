import React from 'react';
import { css } from '@emotion/css';

import { CommonBox, CommonCloseButton, CommonModal } from './Common';
import { RecorderView } from './RecorderView';

interface RecorderDialogProps {
    isOpen: boolean;
    onClose: () => void;
    setAudioBlob: (blob: Blob) => void;
}

export const RecorderDialog = ({ isOpen, onClose, setAudioBlob }: RecorderDialogProps) => (
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
                marginBottom: '3rem'
            })}>
                <span className={css({
                    marginRight: '5rem'
                })}>
                    Record a voice message!
                    <br />
                    You can record up to 10 seconds.
                </span>
                <CommonCloseButton onClick={onClose} />
            </div>
            <RecorderView onSave={blob => {
                setAudioBlob(blob);
                onClose();
            }} />
        </CommonBox>
    </CommonModal>
);
