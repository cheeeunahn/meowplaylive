import React, { useContext, useState } from 'react';
import { css, cx } from '@emotion/css';

import { commonColors, CommonInput, CommonProfile, youTubeColors } from 'component/Common';
import { StoreContext } from 'component/Store';
import { socket } from 'common/Connection';
import { Chat } from 'common/Chat';
import { EmojiSelector } from 'component/video-page/EmojiSelector';
import { SpecialChatMenu } from 'component/video-page/SpecialChatMenu';
import { DonationSelector } from 'component/video-page/DonationSelector';

const iconStyle = css({
    cursor: 'pointer',
    width: '1.2rem',
    height: '1.2rem',
    // This put the text at the center of the vertical axis.
    lineHeight: '1.2rem',
    fontSize: '1rem',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: youTubeColors.lightGray,
    '&:hover': {
        backgroundColor: youTubeColors.gray
    }
});

const smileStyle = cx('fa', 'fa-smile-o',
    css([iconStyle, {
        borderRadius: '50%'
    }])
);

const keyboardStyle = cx('fa', 'fa-keyboard-o',
    css([iconStyle, {
        width: '1.5rem',
        borderRadius: '0.2rem',
        fontSize: '1.5rem',
        color: youTubeColors.darkGray,
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }])
);

const moneyStyle = cx('fa', 'fa-usd',
    css([iconStyle, {
        width: '1.5rem',
        borderRadius: '0.2rem'
    }])
);

export const ChatSender = () => {
    const { profileColor, nickname } = useContext(StoreContext);

    const [content, setContent] = useState<string>('');
    const [showEmojiSelector, setShowEmojiSelector] = useState<boolean>(false);
    const [showSpecialChatMenu, setShowSpecialChatMenu] = useState<boolean>(false);
    const [showDonationSelector, setShowDonationSelector] = useState<boolean>(false);

    const chat: Chat = {
        profileColor: profileColor,
        nickname: nickname,
        content: content,
        donation: 0,
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

    const sendChat = () => {
        if (content.length === 0) {
            return;
        }

        socket.emit('upload-chat', chat);
        cropAndSetContent('');
    };

    return (
        <div className={css({
            position: 'relative',
            boxSizing: 'border-box',
            width: '100%',
            padding: '1rem 0'
        })}>
            <div className={css({
                boxSizing: 'border-box',
                marginBottom: '1rem',
                padding: '0 2rem'
            })}>
                <CommonProfile profileColor={profileColor} />
                <div className={css({
                    display: 'inline-block'
                })}>
                    <div className={css({
                        color: youTubeColors.gray,
                        marginBottom: '0.5rem'
                    })}>
                        {nickname}
                    </div>
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
                                sendChat();
                            }
                        }}
                    />
                </div>
            </div>
            {showEmojiSelector && (
                <EmojiSelector onSelect={emoji => {
                    cropAndSetContent(content + emoji);
                }} />
            )}
            {showSpecialChatMenu && (
                <SpecialChatMenu
                    onOpenDonationSelector={() => {
                        setShowSpecialChatMenu(false);
                        setShowDonationSelector(true);
                    }}
                    onClose={() => {
                        setShowSpecialChatMenu(false);
                    }}
                />
            )}
            {showDonationSelector && (
                <DonationSelector
                />
            )}
            <div className={css({
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                padding: '0 2rem'
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
                <i
                    className={moneyStyle}
                    aria-hidden={true}
                    onClick={() => {
                        setShowSpecialChatMenu(true);
                    }}
                />
                <span className={css({
                    color: youTubeColors.lightGray,
                    marginLeft: 'auto'
                })}>
                    {content.length}/{maxContentLength}
                </span>
                <i
                    className={cx('fa', 'fa-paper-plane', css([
                        {
                            color: youTubeColors.lightGray,
                            marginLeft: '1rem'
                        },
                        (content.length > 0) && {
                            cursor: 'pointer',
                            '&:hover': {
                                color: commonColors.blue
                            }
                        }
                    ]))}
                    aria-hidden={true}
                    onClick={() => {
                        sendChat();
                    }}
                />
            </div>
        </div>
    );
};
