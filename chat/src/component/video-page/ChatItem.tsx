import React, { ReactNode } from 'react';
import { css, cx } from '@emotion/css';

import { CommonBox } from 'component/Common';
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
        <i
            className={cx(
                'fa', 'fa-user',
                css({
                    width: '1rem',
                    height: '1rem',
                    textAlign: 'center',
                    color: chat.profileColor,
                    border: '1px solid #000000',
                    borderRadius: '50%'
                })
            )}
            aria-hidden={true}
        />
        <span className={css({
            marginLeft: '0.5rem',
            fontWeight: 'bold'
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
