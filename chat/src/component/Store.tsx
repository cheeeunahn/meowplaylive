import React, { createContext, ReactNode, useState } from 'react';

type PageType = 'LandingPage' | 'VideoPage';

/**
 * States of the app & setter functions.
 */
interface Store {
    // YouTube video id.
    videoID: string;
    setVideoID: (value: string) => void;

    // Nickname.
    nickname: string;
    setNickname: (value: string) => void;

    page: PageType;
    setPage: (value: PageType) => void;
}

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
    const [videoID, setVideoID] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [page, setPage] = useState<PageType>('LandingPage');

    const store: Store = {
        videoID,
        setVideoID,

        nickname,
        setNickname,

        page,
        setPage
    };

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

