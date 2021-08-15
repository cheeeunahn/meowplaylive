import React from 'react';
import { css } from '@emotion/css';

import { CommonBox, CommonProfile, youTubeColors } from 'component/Common';
import { Chat } from 'common/Chat';
import { numberToFormattedString } from 'common/StringUtils';

const commonContentStyle = css({
    // If the line is too long, move some characters to the next line.
    // (To avoid the scrollbar...)
    wordBreak: 'break-all'
});

interface Props {
    chat: Chat;
}

export const DefaultChatItem = ({ chat }: Props) => (
    <CommonBox className={css([
        {
            display: 'flex',
            boxSizing: 'border-box',
            alignItems: 'center',
            marginBottom: '0.5rem',
            padding: 0,
            boxShadow: 'none'
        }
    ])}>
        <CommonProfile profileColor={chat.profileColor} />
        <span className={css({
            fontWeight: 'bold',
            color: youTubeColors.gray
        })}>
            {chat.nickname}
        </span>
        <span className={css([commonContentStyle, {
            marginLeft: '0.5rem'
        }])}>
            {chat.content}
        </span>
    </CommonBox>
);

export const SuperChatItem = ({ chat }: Props) => (
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
                profileColor={chat.profileColor}
            />
            <div className={css({
                display: 'inline-block'
            })}>
                <div className={css({
                    color: youTubeColors.gray,
                    marginBottom: '0.5rem'
                })}>
                    {chat.nickname}
                </div>
                <div>
                    &#8361; {numberToFormattedString(chat.donation)}
                </div>
            </div>
        </div>
        <div className={css([commonContentStyle, {
            boxSizing: 'border-box',
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: youTubeColors.lightYellow
        }])}>
            {chat.content}
        </div>
    </CommonBox>
);
