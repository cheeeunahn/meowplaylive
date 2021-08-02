import React, { useState } from 'react';
import { css } from '@emotion/css';

import { CommonBox, commonSizes, commonColors, CommonButton } from './Common';
import { CatScreen } from './CatScreen';
import { RecordDialog } from './RecordDialog';

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

const RecordButton = () => {
    // isDialogOpen: Whether RecordDialog is open or not. (Default: false)
    // setDialogOpen: Open/close the dialog.
    const [isDialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <CommonButton
                className={css({
                    flex: '0.5',
                    marginRight: '2rem'
                })}
                buttonColor={commonColors.blue}
                onClick={() => {
                    setDialogOpen(true);
                }}
            >
                ⏺️ Record new message
            </CommonButton>
            <RecordDialog
                isOpen={isDialogOpen}
                onClose={() => {
                    setDialogOpen(false);
                }}
            />
        </>
    );
};

const SendButton = () => (
    <CommonButton
        className={css({
            flex: '0.5'
        })}
        buttonColor={commonColors.pink}
    >
        🐱 Send to cat
    </CommonButton>
);

export const Content = () => (
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
            <RecordButton />
            <SendButton />
        </div>
    </CommonBox>
);
