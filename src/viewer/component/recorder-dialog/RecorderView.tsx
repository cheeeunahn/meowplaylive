import React, { useState, useEffect, useContext } from 'react';
import { css } from '@emotion/css';

import { stopRecording, startRecording, startPlaying, stopPlaying } from 'util/RecorderUtils';
import { StoreContext } from 'component/Store';
import { commonColors, CommonSlider, CommonButton } from 'component/Common';
import { Clock } from 'component/recorder-dialog/Clock';
import { PlayButton } from 'component/recorder-dialog/PlayButton';

const buttonStyle = css({
    display: 'block',
    width: '12rem',
    marginTop: '0.5rem'
});

interface Props {
    onSave: () => void;
}

export const RecorderView = ({ onSave }: Props) => {
    const { voiceRecorder, voicePlayer, setVoiceBlob } = useContext(StoreContext);

    const [mode, setMode] = useState<'Stop' | 'Record' | 'Play'>('Stop');
    const [time, setTime] = useState<number>(0);
    const [currentVoiceLength, setCurrentVoiceLength] = useState<number>(0);
    const [currentVoiceBlob, setCurrentVoiceBlob] = useState<Blob | null>(null);
    const [onFrame, setFrame] = useState<number | undefined>(undefined);

    const maxTime = 10;

    // When this component is rendered...
    useEffect(() => {
        let chunks: Blob[] = [];

        const onRecord = (event: BlobEvent) => {
            chunks.push(event.data);
        };

        const onStop = () => {
            setCurrentVoiceBlob(new Blob(chunks, { 'type': 'audio/mp3' }));

            // Clear the current data.
            chunks = [];
        };

        voiceRecorder!!.addEventListener('dataavailable', onRecord);
        voiceRecorder!!.addEventListener('stop', onStop);

        // When this component is removed... remove the listeners.
        return () => {
            voiceRecorder!!.removeEventListener('dataavailable', onRecord);
            voiceRecorder!!.removeEventListener('stop', onStop);
        };
    }, []);

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
                    stopRecording(voiceRecorder!!);

                    // Stop recording when the time is over.
                    setMode('Stop');
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
                visibility: (currentVoiceBlob || (mode === 'Record')) ? 'visible' : 'hidden'
            })}>
                {
                    (mode === 'Record')
                        ? <Clock time={time} />
                        : <PlayButton mode={(mode === 'Play') ? 'Stop' : 'Play'} onClick={() => {
                            if (mode === 'Stop') {
                                setMode('Play');
                                startPlaying(voicePlayer, currentVoiceBlob!!);
                            } else {
                                setMode('Stop');
                                stopPlaying(voicePlayer);
                            }
                        }} />
                }
                <CommonSlider
                    sliderColor={commonColors.green}
                    showMark={false}
                    showThumb={false}
                    isReadonly={true}
                    max={(mode === 'Record') ? maxTime : currentVoiceLength}
                    value={time}
                />
            </div>
            <CommonButton
                className={buttonStyle}
                isDisabled={!voiceRecorder}
                buttonColor={(mode === 'Record') ? commonColors.brown : commonColors.blue}
                onClick={() => {
                    if (mode === 'Stop') {
                        startRecording(voiceRecorder!!);
                        setMode('Record');
                    } else {
                        stopRecording(voiceRecorder!!);
                        setMode('Stop');
                    }
                }}
            >
                {(mode === 'Record') ? 'Stop recording' : (currentVoiceBlob ? 'Record again' : 'Start recording')}
            </CommonButton>
            <CommonButton
                className={buttonStyle}
                isDisabled={!currentVoiceBlob}
                onClick={() => {
                    setVoiceBlob(currentVoiceBlob!!);
                    onSave();
                }}
            >
                Save recording
            </CommonButton>
        </div>
    );
};
