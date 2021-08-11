import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/css';

import { CommonModal, CommonBox, CommonCloseButton, CommonSlider, commonColors, CommonButton } from 'component/Common';
import { StoreContext } from 'component/Store';
import { numberToFormattedString } from 'common/StringUtils';
import { socket } from 'common/Connection';

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

export const DonationDialog = ({ isOpen, onClose }: DonationDialogProps) => {
    const { voiceBlob, nickname, availablePoint, setAvailablePoint } = useContext(StoreContext);

    const [currentPointLevel, setCurrentPointLevel] = useState<number>(0);
    const currentPoint = pointList[currentPointLevel];

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
                    marginBottom: '3rem'
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
                        if (currentPoint > availablePoint) {
                            alert(`You can't donate ${numberToFormattedString(currentPoint)} points since you have ${numberToFormattedString(availablePoint)} points left.`);
                            return;
                        }

                        socket.emit('name-sent', nickname);

                        const timestamp = Date.now();

                        socket.emit('button-clicked', {
                            nickname: nickname,
                            audio: voiceBlob!!,
                            donation: currentPoint,
                            socketid: socket.id,
                            timestamp: timestamp
                        });

                        socket.emit('upload-audio', {
                            nickname: nickname,
                            audio: voiceBlob!!,
                            donation: currentPoint,
                            socketid: socket.id,
                            timestamp: timestamp
                        });

                        setAvailablePoint(availablePoint - currentPoint);
                        onClose();
                    }}
                >
                    Send!
                </CommonButton>
            </CommonBox>
        </CommonModal>
    );
};
