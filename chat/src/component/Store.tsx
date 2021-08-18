import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { generateRandomColor } from 'common/ColorUtils';
import { socket } from 'common/Connection';

type PageType = 'LandingPage' | 'VideoPage';

/**
 * States of the app & setter functions.
 */
interface Store {
    profileColor: string;

    // YouTube video id.
    videoID: string;
    setVideoID: (value: string) => void;

    // Nickname.
    nickname: string;
    setNickname: (value: string) => void;

    page: PageType;
    setPage: (value: PageType) => void;

    // Available points to use.
    availablePoint: number,
    setAvailablePoint: (value: number) => void,
}

/**
 * Generate the profile color when starting the program.
 */
const generatedProfileColor = generateRandomColor();

/**
 * Represents the current value of the store.
 */
export const StoreContext = createContext({} as Store);

interface Props {
    children: ReactNode;
}

/**
 * Broadcasts the context's value to the childs
 */
export const StoreProvider = ({ children }: Props) => {
    const maxPoint = 0;

    const [videoID, setVideoID] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [page, setPage] = useState<PageType>('LandingPage');
    const [availablePoint, setAvailablePoint] = useState<number>(maxPoint);

    const store: Store = {
        profileColor: generatedProfileColor,

        videoID,
        setVideoID,

        nickname,
        setNickname,

        page,
        setPage,

        availablePoint,
        setAvailablePoint
    };

    useEffect(() => {
        const onApplyPoint = (data: { nickname: string, point: number }) => {
            if (nickname === data.nickname) {
                setAvailablePoint(data.point);
            }
        };

        if (nickname.length > 0) {
            socket.on('apply-chat-point', onApplyPoint);

            // Request the amount of available points from the server.
            socket.emit('init-chat-point', { socketid: socket.id, nickname: nickname });
        };

        return () => {
            socket.off('apply-chat-point', onApplyPoint);
        };
    }, [nickname]);

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

