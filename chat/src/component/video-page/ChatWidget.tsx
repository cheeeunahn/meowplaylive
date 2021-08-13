import React from 'react';
import { css } from '@emotion/css';

import { CommonBox } from 'component/Common';
import { ChatViewer } from 'component/video-page/ChatViewer';
import { ChatSender } from 'component/video-page/ChatSender';

export const ChatWidget = () => {
    return (
        <CommonBox className={css({
            display: 'inline-flex',
            flexDirection: 'column',
            width: '720px', /*30rem*/
            height: '380px', /*20rem*/
            padding: '0'
        })}>
            <ChatViewer />
            <ChatSender />
        </CommonBox>
    );
};
