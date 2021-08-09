import React, { createContext, ReactNode, useState } from 'react';

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

    const store: Store = {
        videoID,
        setVideoID,

        nickname,
        setNickname
    };

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

