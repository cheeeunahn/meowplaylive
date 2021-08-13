import React from 'react';
import { css } from '@emotion/css';

import { CommonBox, CommonProfile, youTubeColors } from 'component/Common';
import { Chat } from 'common/Chat';

interface Props {
    chat: Chat;
}

export const ChatItem = ({ chat }: Props) => (
    <CommonBox className={css([
        {
            display: 'flex',
            boxSizing: 'border-box',
            alignItems: 'center',
            marginBottom: '0.5rem'
        },
        (chat.donation > 0) ? {
            padding: '0.5rem',
            backgroundColor: '#c9e9f6'
        } : {
            padding: 0,
            boxShadow: 'none'
        }
    ])}>
        <CommonProfile profileColor={chat.profileColor} />
        <span className={css({
            marginLeft: '0.5rem',
            fontWeight: 'bold',
            color: youTubeColors.gray
        })}>
            {chat.nickname}
        </span>
        <span className={css({
            marginLeft: '0.5rem'
        })}>
            {chat.content}
        </span>
    </CommonBox>
);
