import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/css';

import { CommonModal, CommonBox, CommonCloseButton, CommonSlider, commonColors, CommonButton, CommonPlayButton } from 'component/Common';
import { StoreContext } from 'component/Store';
import { numberToFormattedString, timestampToString } from 'common/StringUtils';
import { socket } from 'common/Connection';
import { addPlayerStopListener, removePlayerStopListener, startPlaying, stopPlaying } from 'common/AudioPlayer';

const pointList = [
    1000,
    2000,
    5000,
    10000,
    20000,
    50000,
    100000,
    200000,
    300000,
    400000,
    500000
];

interface DonationDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

socket.on('number-exceeded', () => {
    alert('Please wait until other people\'s fish are off the screen! 😿');
});

export const DonationDialog = ({ isOpen, onClose }: DonationDialogProps) => {
    const { voiceBlob, nickname, availablePoint } = useContext(StoreContext);

    const [currentPointLevel, setCurrentPointLevel] = useState<number>(0);
    const [mode, setMode] = useState<'Stop' | 'Play'>('Stop');
    const currentPoint = pointList[currentPointLevel];

    const updatePoint = (pointDiff: number) => {
        socket.emit('update-point', { socketid: socket.id, nickname: nickname, pointDiff: pointDiff });
    };

    const spendPoint = () => {
        if (currentPoint > availablePoint) {
            alert(`You can't donate ${numberToFormattedString(currentPoint)} points since you have ${numberToFormattedString(availablePoint)} points left.`);
            return false;
        }

        updatePoint(-currentPoint);
        return true;
    };

    const sendDonation = () => {
        // If spendPoint() fails (ex. not enough money), do nothing.
        if (!spendPoint()) {
            return;
        }

        socket.emit('name-sent', nickname);

        const timestamp = Date.now();

        socket.emit('button-clicked', {
            nickname: nickname,
            audio: voiceBlob!!,
            donation: currentPoint,
            socketid: socket.id,
            timestamp: timestamp,
            timestampString: timestampToString(timestamp)
        });

        socket.emit('upload-audio', {
            nickname: nickname,
            audio: voiceBlob!!,
            donation: currentPoint,
            socketid: socket.id,
            timestamp: timestamp
        });

        const lastSpentPoint = currentPoint;

        const onFail = () => {
            // Return the half of the point if the user fails.
            updatePoint(Math.floor(lastSpentPoint / 2));
        };

        socket.once('cat-tap-fail', onFail);
        onClose();
    };

    useEffect(() => {
        const onStopPlaying = () => {
            setMode('Stop');
        };

        addPlayerStopListener(onStopPlaying);

        return () => {
            removePlayerStopListener(onStopPlaying);
        };
    }, []);

    return (
        <CommonModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <CommonBox className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem 1.5rem'
            })}>
                <div className={css({
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '1rem'
                })}>
                    <span className={css({
                        marginRight: '5rem'
                    })}>
                        Select the amount of donation
                        <br />
                        You would like to make
                    </span>
                    <CommonCloseButton onClick={onClose} />
                </div>
                <div className={css({
                    width: '100%',
                    marginBottom: '0.5rem'
                })}>
                    Preview&nbsp;&nbsp;
                    <CommonPlayButton
                        mode={(mode === 'Play') ? 'Stop' : 'Play'}
                        size={'2rem'}
                        fontSize={'1rem'}
                        onClick={() => {
                            if (mode === 'Stop') {
                                setMode('Play');
                                startPlaying(voiceBlob!!);
                            } else {
                                setMode('Stop');
                                stopPlaying();
                            }
                        }}
                    />
                </div>
                <div className={css({
                    height: '3rem',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                })}>
                    {numberToFormattedString(currentPoint)}
                </div>
                <CommonSlider
                    sliderColor={commonColors.green}
                    showMark={false}
                    value={currentPointLevel}
                    max={10}
                    onChange={value => {
                        setCurrentPointLevel(value);
                    }}
                />
                <CommonButton
                    className={css({
                        display: 'block',
                        width: '12rem',
                        marginTop: '0.5rem'
                    })}
                    onClick={() => {
                        sendDonation();
                    }}
                >
                    Send!
                </CommonButton>
            </CommonBox>
        </CommonModal>
    );
};
