import React from 'react';
import { css } from '@emotion/css';

import { CommonScreen, CommonButton, CommonCard, CommonTheme } from './Common';

const buttonStyle = css({
    marginBottom: '2rem !important'
});

export const HomeScreen = ({ setScreen, voice }) => (
    <CommonScreen>
        {(voice === null) ? (
            <CommonButton className={buttonStyle} fillWidth={true} isDisabled={true}>
                You have no voice
                <br />
                message saved!
            </CommonButton>
        ) : (
            <CommonButton className={buttonStyle} fillWidth={true}>
                Voice message saved
                <br />
                Click to preview
            </CommonButton>
        )}
        <CommonButton className={buttonStyle} fillWidth={true} onClick={() => {
            setScreen('record');
        }}>
            Click here to record
            <br />
            voice message
        </CommonButton>
        <CommonTheme isBright={false}>
            <CommonCard className={css({
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            })}>
                Please wait until the
                <br />
                interactive session is
                <br />
                opened by the streamer
            </CommonCard>
        </CommonTheme>
    </CommonScreen>
);
