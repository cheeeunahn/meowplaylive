import React, { useContext, useState } from 'react';
import { css, cx } from '@emotion/css';

import { StoreContext } from 'component/Store';
import { socket } from 'common/Connection';
import { Chat } from 'common/Chat';
import { numberToFormattedString } from 'common/StringUtils';
import { CommonBox, CommonButton, CommonInput, CommonProfile, CommonSlider, youTubeColors } from 'component/Common';
import { EmojiSelector } from 'component/video-page/EmojiSelector';

const iconStyle = css({
    cursor: 'pointer',
    width: '1.2rem',
    height: '1.2rem',
    // This put the text at the center of the vertical axis.
    lineHeight: '1.2rem',
    fontSize: '1rem',
    textAlign: 'center',
    color: youTubeColors.darkGray
});

const smileStyle = cx('fa', 'fa-smile-o',
    css([iconStyle, {
        color: '#bbbbbb',
        backgroundColor: youTubeColors.darkGray,
        borderRadius: '50%'
    }])
);

const keyboardStyle = cx('fa', 'fa-keyboard-o',
    css([iconStyle, {
        width: '1.5rem',
        borderRadius: '0.2rem',
        fontSize: '1.5rem',
        color: youTubeColors.darkGray,
        backgroundColor: 'transparent'
    }])
);

const xStyle = cx('fa', 'fa-times', css({
    cursor: 'pointer',
    width: '1.5rem',
    marginRight: '1rem',
    fontSize: '1.2rem',
    color: youTubeColors.lightGray,
    '&:hover': {
        color: youTubeColors.gray
    }
}));

interface Props {
    onClose: () => void;
}

export const DonationSelector = ({ onClose }: Props) => {
    const { profileColor, nickname } = useContext(StoreContext);

    const [content, setContent] = useState<string>('');
    const [showEmojiSelector, setShowEmojiSelector] = useState<boolean>(false);

    const chat: Chat = {
        profileColor: profileColor,
        nickname: nickname,
        content: content,
        donation: 10000,
        timestamp: Date.now(),
        type: 'SuperChat'
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
            marginBottom: '0.5rem'
        })}>
            <div className={css({
                marginTop: '1rem'
            })}>
                <i
                    className={xStyle}
                    aria-hidden={true}
                    onClick={() => {
                        onClose();
                    }}
                />
                <span className={css({
                    color: youTubeColors.gray
                })}>
                    Send a Super Chat
                </span>
            </div>
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
                                onClose();
                            }
                        }}
                    />
                </div>
            </CommonBox>
            {showEmojiSelector && (
                <EmojiSelector
                    className={css({
                        boxSizing: 'border-box',
                        paddingTop: '1rem',
                        marginBottom: 0,
                        backgroundColor: youTubeColors.veryLightGray
                    })}
                    buttonColor={youTubeColors.transparentGray}
                    onSelect={emoji => {
                        cropAndSetContent(content + emoji);
                    }}
                />
            )}
            <div className={css({
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                marginBottom: '1rem',
                padding: '1rem 1rem',
                backgroundColor: youTubeColors.veryLightGray
            })}>
                <div className={css({
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '1.5rem',
                    textAlign: 'center',
                    marginRight: '1rem'
                })}>
                    <i
                        className={showEmojiSelector ? keyboardStyle : smileStyle}
                        aria-hidden={true}
                        onClick={() => {
                            setShowEmojiSelector(!showEmojiSelector);
                        }}
                    />
                </div>
            </div>
            <div className={css({
                textAlign: 'center',
                width: '100%',
                marginBottom: '1rem',
                fontSize: '1.2rem',
                color: youTubeColors.gray
            })}>
                &#8361; <span className={css({ color: youTubeColors.darkGray })}>{numberToFormattedString(10000)}</span> KRW
            </div>
            <CommonSlider
                className={css({
                    marginBottom: '1rem'
                })}
                showMark={true}
                showThumb={true}
                isReadonly={true}
                min={0}
                max={10}
                value={3}
                step={1}
            />
            <CommonButton
                className={css({
                    display: 'block',
                    width: '100%',
                    borderRadius: 0
                })}
                buttonColor={youTubeColors.lightBlue}
                onClick={() => {
                    sendSuperChat();
                    onClose();
                }}
            >
                Buy and send
            </CommonButton>
        </div>
    );
};
