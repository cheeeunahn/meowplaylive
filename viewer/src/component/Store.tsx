import React, { createContext, ReactNode, useState } from 'react';

/**
 * States of the app & setter functions.
 */
interface Store {
    // Recorded voice data. (mp3 format)
    voiceBlob: Blob | null,
    setVoiceBlob: (value: Blob) => void,

    // User's nickname.
    nickname: string,
    setNickname: (value: string) => void,

    // Available points to use.
    availablePoint: number,
    setAvailablePoint: (value: number) => void,

    // Used points.
    usedPoint: number,

    // If the user fails to be chosen by the cat,
    // we give a chance to send the voice without spending the points.
    chanceCount: number,
    setChanceCount: (value: number) => void
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
 *
 * @example
 * <StoreProvider value={{nickname: 'Hello'}}>
 *     <MyBox>
 *         <MyPage>
 *             <MyComponent/>
 *         </MyPage>
 *     </MyBox>
 * </StoreProvider>
 *
 * const MyComponent = () => {
 *     // nickname = 'Hello';
 *     const {nickname} = useContext(StoreContext);
 *     return <div>{nickname}</div>;
 * };
 */
export const StoreProvider = ({ children }: Props) => {
    const maxPoint = 500000;

    const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
    const [nickname, setNickname] = useState<string>('');
    const [availablePoint, setAvailablePoint] = useState<number>(maxPoint);
    const [chanceCount, setChanceCount] = useState<number>(0);

    const store: Store = {
        voiceBlob,
        setVoiceBlob,

        nickname,
        setNickname,

        availablePoint,
        setAvailablePoint,

        usedPoint: maxPoint - availablePoint,

        chanceCount,
        setChanceCount
    };

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
