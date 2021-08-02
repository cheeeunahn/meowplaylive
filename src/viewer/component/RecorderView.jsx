import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';

import { CommonButton, commonColors, CommonIconButton, CommonSlider } from './Common';
import { createRecorder, startRecording, stopRecording, playAudioBlob } from '../core/Recorder';

const buttonStyle = css({
    display: 'block',
    width: '12rem',
    marginTop: '0.5rem'
});

const PlayButton = ({ onClick }) => (
    <CommonIconButton
        className={css({
            width: '3rem',
            height: '3rem',
            fontSize: '1.5rem',
            lineHeight: '1.5rem'
        })}
        buttonColor={commonColors.green}
        onClick={onClick}
    >
        ▶
    </CommonIconButton>
);

const Clock = ({ time }) => {
    const seconds = Math.floor(time);
    const minuteString = `${Math.floor(seconds / 60)}`;
    const secondString = `${seconds % 60}`.padStart(2, '0');

    return (
        <div className={css({
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
        })}>
            {minuteString}:{secondString}
        </div>
    );
};

export const RecorderView = () => {
    const [voiceRecorder, setVoiceRecorder] = useState(null);
    const [isRecording, setRecording] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null);

    // Called at the first render.
    useEffect(() => {
        createRecorder({
            onLoad: recorder => {
                setVoiceRecorder(recorder);
            },
            onStop: blob => {
                setAudioBlob(blob);
            }
        });
    }, []);

    // Called when elapsedTime or isRecording are changed.
    useEffect(() => {
        if (!isRecording) {
            return;
        }

        const timer = setInterval(() => {
            if (elapsedTime < 10) {
                setElapsedTime(elapsedTime + 0.1);
            } else {
                clearInterval(timer);
                stopRecording(voiceRecorder);
                setRecording(false);
            }
        }, 100);

        // Remove the timer when this element is removed.
        return () => clearInterval(timer);
    }, [elapsedTime, isRecording]);

    return (
        <div className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        })}>
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                visibility: (audioBlob || isRecording) ? 'visible' : 'hidden'
            })}>
                {isRecording ? <Clock time={elapsedTime} /> : <PlayButton onClick={() => {
                    playAudioBlob(audioBlob);
                }} />}
                <CommonSlider
                    showMark={false}
                    showThumb={false}
                    isReadonly={true}
                    max={10}
                    value={elapsedTime}
                />
            </div>
            <CommonButton
                className={buttonStyle}
                buttonColor={isRecording ? commonColors.brown : commonColors.blue}
                onClick={() => {
                    if (voiceRecorder === null) {
                        alert('Recorder is not loaded yet!');
                        return;
                    }

                    if (!isRecording) {
                        startRecording(voiceRecorder);
                        setRecording(true);
                    } else {
                        stopRecording(voiceRecorder);
                        setRecording(false);
                    }
                }}
            >
                {isRecording ? 'Stop recording' : 'Start recording'}
            </CommonButton>
            <CommonButton className={buttonStyle} isDisabled={true}>
                Save recording
            </CommonButton>
        </div>
    );
};
