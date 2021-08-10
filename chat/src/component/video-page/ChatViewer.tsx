import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';

import { socket } from 'common/Connection';
import { Chat } from 'common/Chat';
import { ChatItem } from 'component/video-page/ChatItem';

export const ChatViewer = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let currentChats: Chat[] = [];

        const onNewChat = (chat: Chat) => {
            if (currentChats.length === 0) {
                currentChats = [chat];
            } else {
                let index = 0;

                for (let i = currentChats.length - 1; i >= 0; i--) {
                    if (chat.timestamp >= currentChats[i].timestamp) {
                        index = i + 1;
                        break;
                    }
                }

                currentChats = [...currentChats.slice(0, index), chat, ...currentChats.slice(index)];
            }

            setChats(currentChats);
        };

        socket.on('upload-chat', onNewChat);

        return () => {
            socket.off('upload-chat', onNewChat)
        };
    }, []);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chats]);

    return (
        <div
            className={css({
                boxSizing: 'border-box',
                overflowY: 'auto',
                width: '100%',
                height: '100%',
                padding: '1.5rem',
                flex: 1
            })}
        >
            {chats.map((chat, index) => (
                <div {...((index === chats.length - 1) ? { ref: ref } : {})}>
                    <ChatItem
                        key={`${index}-${chat.timestamp}`}
                        chat={chat}
                    />
                </div>
            ))}
        </div>
    );
};
