import React, { useContext, useState } from 'react';
import { css } from '@emotion/css';

import { StoreContext } from 'component/Store';
import { socket } from 'common/Connection';
import { Chat } from 'common/Chat';
import { CommonBox, CommonButton, CommonInput, CommonProfile, youTubeColors } from 'component/Common';
import { numberToFormattedString } from 'common/StringUtils';

interface Props {
    onSend: () => void;
}

export const DonationSelector = ({ onSend }: Props) => {
    const { profileColor, nickname } = useContext(StoreContext);

    const [content, setContent] = useState<string>('');

    const chat: Chat = {
        profileColor: profileColor,
        nickname: nickname,
        content: content,
        donation: 10000,
        timestamp: Date.now()
    };

    const maxContentLength = 200;

    const cropAndSetContent = (newContent: string) => {
        if (newContent.length <= maxContentLength) {
            setContent(newContent);
        } else {
            setContent(newContent.substring(0, maxContentLength));
        }
    };

    const sendSuperChat = () => {
        if (content.length === 0) {
            return;
        }

        socket.emit('upload-chat', chat);
        cropAndSetContent('');
    };

    return (
        <div className={css({
            zIndex: 200,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '0 1rem',
            marginTop: '0.5rem',
            marginBottom: '0.5rem'
        })}>
            <div className={css({
                textAlign: 'right',
                width: '100%',
                fontSize: '0.8rem',
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                color: youTubeColors.gray
            })}>
                {content.length}/{maxContentLength}
            </div>
            <CommonBox className={css({
                padding: 0
            })}>
                <div className={css({
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    backgroundColor: youTubeColors.yellow
                })}>
                    <CommonProfile
                        className={css({
                            width: '2rem',
                            height: '2rem',
                            lineHeight: '2rem',
                            fontSize: '1.5rem'
                        })}
                        profileColor={profileColor}
                    />
                    <div className={css({
                        display: 'inline-block'
                    })}>
                        <div className={css({
                            color: youTubeColors.gray,
                            marginBottom: '0.5rem'
                        })}>
                            {nickname}
                        </div>
                        <div>
                            &#8361; {numberToFormattedString(10000)}
                        </div>
                    </div>
                </div>
                <div className={css({
                    boxSizing: 'border-box',
                    marginBottom: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: youTubeColors.lightYellow
                })}>
                    <CommonInput
                        className={css({
                            width: '100%'
                        })}
                        variant={'standard'}
                        placeholder={'Say something...'}
                        value={content}
                        onChange={value => {
                            cropAndSetContent(value);
                        }}
                        onKeyPress={key => {
                            if (key === 'Enter') {
                                sendSuperChat();
                                onSend();
                            }
                        }}
                    />
                </div>
            </CommonBox>
            <div className={css({
                textAlign: 'center',
                width: '100%',
                marginBottom: '1rem',
                fontSize: '1.2rem',
                color: youTubeColors.gray
            })}>
                &#8361; <span className={css({ color: youTubeColors.darkGray })}>{numberToFormattedString(10000)}</span> KRW
            </div>
            <CommonButton
                className={css({
                    display: 'block',
                    width: '100%',
                    borderRadius: 0
                })}
                buttonColor={youTubeColors.lightBlue}
                onClick={() => {
                    sendSuperChat();
                    onSend();
                }}
            >
                Buy and send
            </CommonButton>
        </div>
    );
};
