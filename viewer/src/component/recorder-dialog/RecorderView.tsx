import React, { useState, useEffect, useContext } from 'react';
import { css } from '@emotion/css';

import { StoreContext } from 'component/Store';
import { commonColors, CommonSlider, CommonButton, CommonPlayButton } from 'component/Common';
import { Clock } from 'component/recorder-dialog/Clock';
import { stopRecording, startRecording } from 'common/AudioRecorder';
import { startPlaying, stopPlaying } from 'common/AudioPlayer';

const buttonStyle = css({
    display: 'block',
    width: '12rem',
    marginTop: '0.5rem'
});

interface Props {
    onSave: () => void;
}

export const RecorderView = ({ onSave }: Props) => {
    const { setVoiceBlob } = useContext(StoreContext);

    const [mode, setMode] = useState<'Stop' | 'Record' | 'Play'>('Stop');
    const [time, setTime] = useState<number>(0);
    const [currentVoiceLength, setCurrentVoiceLength] = useState<number>(0);
    const [currentVoiceBlob, setCurrentVoiceBlob] = useState<Blob | null>(null);
    const [onFrame, setFrame] = useState<number | undefined>(undefined);

    const maxTime = 10;

    const onStartRecording = () => {
        setMode('Record');
    };

    const onStopRecording = (blob: Blob) => {
        setCurrentVoiceBlob(blob);
        setMode('Stop');
    };

    // Called when elapsedTime or isRecording are changed.
    useEffect(() => {
        // Reset the frame handler.
        window.clearInterval(onFrame);

        if (mode === 'Stop') {
            // Reset the timer when we stop recording.
            setTime(0);
            return;
        } else if (mode === 'Record') {
            setFrame(window.setInterval(() => {
                if (time < maxTime) {
                    const newTime = time + 0.1;
                    setTime(newTime);
                    setCurrentVoiceLength(newTime);
                } else {
                    stopRecording(onStopRecording);

                    // Stop recording when the time is over.
                }
            }, 100));
        } else if (mode === 'Play') {
            setFrame(window.setInterval(() => {
                if (time < currentVoiceLength) {
                    setTime(time + 0.1);
                } else {
                    setMode('Stop');
                }
            }, 100));
        }

        // When this component is removed... remove the timer.
        return () => {
            window.clearInterval(onFrame);
        };
    }, [time, mode]);

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
                fontSize: '2rem',
                visibility: (currentVoiceBlob || (mode === 'Record')) ? 'visible' : 'hidden'
            })}>
                <div className={css({
                    marginBottom: '1rem'
                })}>
                    {(mode === 'Record') ? <Clock time={time} /> : (
                        <CommonPlayButton
                            mode={(mode === 'Play') ? 'Stop' : 'Play'}
                            onClick={() => {
                                if (mode === 'Stop') {
                                    setMode('Play');
                                    startPlaying(currentVoiceBlob!!);
                                } else {
                                    setMode('Stop');
                                    stopPlaying();
                                }
                            }}
                        />
                    )}
                </div>
                <CommonSlider
                    sliderColor={commonColors.purple}
                    showMark={false}
                    showThumb={false}
                    isReadonly={true}
                    max={(mode === 'Record') ? maxTime : currentVoiceLength}
                    value={time}
                />
            </div>
            <CommonButton
                className={buttonStyle}
                buttonColor={(mode === 'Record') ? commonColors.brown : commonColors.darkblue}
                onClick={() => {
                    if (mode === 'Stop') {
                        startRecording(onStartRecording);
                    } else {
                        stopRecording(onStopRecording);
                    }
                }}
            >
                {(mode === 'Record') ? 'Stop recording' : (currentVoiceBlob ? 'Record again' : 'Start recording')}
            </CommonButton>
            <CommonButton
                className={buttonStyle}
                buttonColor={commonColors.pink}
                isDisabled={!currentVoiceBlob}
                onClick={() => {
                    setVoiceBlob(currentVoiceBlob!!);
                    onSave();
                }}
            >
                Save
            </CommonButton>
        </div>
    );
};
