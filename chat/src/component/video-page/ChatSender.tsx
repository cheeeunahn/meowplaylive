import React, { useContext, useState } from 'react';
import { css, cx } from '@emotion/css';

import { commonColors, CommonInput, CommonProfile, youTubeColors } from 'component/Common';
import { StoreContext } from 'component/Store';
import { socket } from 'common/Connection';
import { Chat } from 'common/Chat';

const iconStyle = css({
    width: '1.2rem',
    height: '1.2rem',
    // This put the text at the center of the vertical axis.
    lineHeight: '1.2rem',
    fontSize: '1rem',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: youTubeColors.lightGray
});

export const ChatSender = () => {
    const { profileColor, nickname } = useContext(StoreContext);

    const [content, setContent] = useState<string>('');

    const chat: Chat = {
        profileColor: profileColor,
        nickname: nickname,
        content: content,
        donation: 0,
        timestamp: Date.now()
    };

    const sendChat = () => {
        if (content.length === 0) {
            return;
        }

        socket.emit('upload-chat', chat);
        setContent('');
    };

    return (
        <div className={css({
            boxSizing: 'border-box',
            width: '100%',
            padding: '1rem 2rem'
        })}>
            <div className={css({
                marginBottom: '1rem'
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
                        variant={'standard'}
                        placeholder={'Say something...'}
                        value={content}
                        onChange={value => {
                            setContent(value);
                        }}
                        onKeyPress={key => {
                            if (key === 'Enter') {
                                sendChat();
                            }
                        }}
                    />
                </div>
            </div>
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                width: '100%'
            })}>
                <i
                    className={cx('fa', 'fa-smile-o',
                        css([iconStyle, {
                            borderRadius: '50%',
                            fontSize: '1.5rem',
                            marginRight: '1rem'
                        }])
                    )}
                    aria-hidden={true}
                />
                <i
                    className={cx('fa', 'fa-usd',
                        css([iconStyle, {
                            width: '1.5rem',
                            borderRadius: '0.2rem'
                        }])
                    )}
                    aria-hidden={true}
                />
                <span className={css({
                    color: youTubeColors.lightGray,
                    marginLeft: 'auto'
                })}>
                    {content.length}/200
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
