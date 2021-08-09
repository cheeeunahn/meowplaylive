import React from 'react';
import { css } from '@emotion/css';

import { generateRandomColor } from 'common/ColorUtils';
import { ChatItem } from 'component/video-page/ChatItem';

export const ChatViewer = () => {
    return (
        <div className={css({
            boxSizing: 'border-box',
            overflowY: 'auto',
            width: '100%',
            height: '100%',
            padding: '0.5rem',
            flex: 1
        })}>
            <ChatItem profileColor={generateRandomColor()} name={'Avant'} isSuperChat={false}>
                Hello, world!
            </ChatItem>
            <ChatItem profileColor={generateRandomColor()} name={'Avant'} isSuperChat={false}>
                Hello, world!
            </ChatItem>
            <ChatItem profileColor={generateRandomColor()} name={'Avant'} isSuperChat={true}>
                Hello, world!
            </ChatItem>
            <ChatItem profileColor={generateRandomColor()} name={'Avant'} isSuperChat={false}>
                Hello, world!
            </ChatItem>
        </div>
    );
};
