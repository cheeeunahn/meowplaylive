import React from 'react';
import { css } from '@emotion/css';

import { CommonBox } from 'component/Common';
import { ChatViewer } from 'component/video-page/ChatViewer';
import { ChatSender } from 'component/video-page/ChatSender';

export const ChatWidget = () => {
    return (
        <div className={css({
            display:'inline-flex',
            width: '100%',
            height: '38%'
            /*position: 'absolute'*/
            /*resize: 'none',*/
        })}>
            <CommonBox className={css({
                display: 'inline-flex',
                flexDirection: 'column',
                width:'100%',
                /*width: '30rem',*/
                /*height:'575px',*/
                /*height: '20rem',*/
                padding: '0'
            })}>
                <ChatViewer />
                <ChatSender />
            </CommonBox>
        </div>
    );
};
