import React, { ReactNode } from 'react';
import { css, cx } from '@emotion/css';

import { CommonBox } from 'component/Common';

interface Props {
    profileColor: string;
    name: string;
    isSuperChat: boolean;
    children: ReactNode;
}

export const ChatItem = ({ profileColor, name, isSuperChat, children }: Props) => (
    <CommonBox className={css([
        {
            display: 'flex',
            boxSizing: 'border-box',
            alignItems: 'center',
            marginBottom: '0.5rem'
        },
        isSuperChat && {
            padding: '0.5rem',
            backgroundColor: '#c9e9f6'
        },
        !isSuperChat && {
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
                    color: profileColor,
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
            {name}
        </span>
        <span className={css({
            marginLeft: '0.5rem'
        })}>
            {children}
        </span>
    </CommonBox>
);
