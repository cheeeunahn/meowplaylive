import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';

import { CommonButton, CommonScreen } from './Common';
import { createRecorder, playAudioBlob, startRecording, stopRecording } from '../core/Recorder';

export const RecordScreen = () => {
    const [voiceRecorder, setVoiceRecorder] = useState(null);
    const [isRecording, setRecording] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const minuteString = `${Math.floor(elapsedTime / 60)}`;
    const secondString = `${elapsedTime % 60}`.padStart(2, '0');

    // Called at the first render.
    useEffect(() => {
        createRecorder({
            onLoad: recorder => {
                setVoiceRecorder(recorder);
            },
            onStop: blob => {
                //playAudioBlob(blob);

                const formData = new FormData();
                formData.append('nickname', 'Hunmin Park');
                formData.append('audio', blob, 'recording-Hunmin-Park.mp3');

                fetch('https://goyangi-client-server-test.herokuapp.com/upload-audio', {
                    method: 'POST',
                    body: formData
                });
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
                setElapsedTime(elapsedTime + 1);
            } else {
                clearInterval(timer);
            }
        }, 1000);

        // Remove the timer when this element is removed.
        return () => clearInterval(timer);
    }, [elapsedTime, isRecording]);

    return (
        <CommonScreen>
            <div className={css({
                fontSize: '4rem',
                marginTop: '9rem',
                marginBottom: '8rem'
            })}>
                {minuteString}:{secondString}
            </div>
            <CommonButton fillWidth={true} onClick={() => {
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
            }}>
                {isRecording ? 'Stop recording' : 'Start recording'}
            </CommonButton>
        </CommonScreen>
    );
};
