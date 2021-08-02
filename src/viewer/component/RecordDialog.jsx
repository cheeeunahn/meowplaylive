import React from 'react';
import { css } from '@emotion/css';

import { CommonBox, CommonIconButton, CommonModal } from './Common';
import { RecorderView } from './RecorderView';

export const RecordDialog = ({ isOpen, onClose }) => (
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
                <CommonIconButton
                    className={css({
                        fontSize: '1.5rem',
                        width: '3rem',
                        height: '3rem'
                    })}
                    onClick={onClose}
                >
                    X
                </CommonIconButton>
            </div>
            <RecorderView />
        </CommonBox>
    </CommonModal>
);
