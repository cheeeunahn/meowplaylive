import React from 'react';
import { css } from '@emotion/css';

import { CommonBox, commonSizes, commonColors, CommonButton } from './Common';
import { CatScreen } from './CatScreen';

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

const RecordButton = () => (
    <CommonButton
        className={css({
            flex: '0.5',
            marginRight: '2rem'
        })}
        buttonColor={commonColors.blue}
    >
        ⏺️ Record new message
    </CommonButton>
);

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
