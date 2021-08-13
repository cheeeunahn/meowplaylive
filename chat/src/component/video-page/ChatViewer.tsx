import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';

import { socket } from 'common/Connection';
import { Chat } from 'common/Chat';
import { DefaultChatItem, SuperChatItem } from 'component/video-page/ChatItem';

export const ChatViewer = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onNewChat = (chat: Chat) => {
            setChats(prevChats => {
                if (prevChats.length === 0) {
                    return [chat];
                } else {
                    let index = 0;

                    for (let i = prevChats.length - 1; i >= 0; i--) {
                        if (chat.timestamp >= prevChats[i].timestamp) {
                            index = i + 1;
                            break;
                        }
                    }

                    return [...prevChats.slice(0, index), chat, ...prevChats.slice(index)];
                }
            });
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
                flex: 1,
                backgroundColor: '#f9f9f9'
            })}
        >
            {chats.map((chat, index) => (
                <div {...((index === chats.length - 1) ? { ref: ref } : {})}>
                    {(chat.donation === 0) ? (
                        <DefaultChatItem
                            key={`${index}-${chat.timestamp}`}
                            chat={chat}
                        />
                    ) : (
                        <SuperChatItem
                            key={`${index}-${chat.timestamp}`}
                            chat={chat}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};
