import { socket } from 'common/Connection';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

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
    usedPoint: number
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
    const maxPoint = 0;

    const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
    const [nickname, setNickname] = useState<string>('');
    const [availablePoint, setAvailablePoint] = useState<number>(maxPoint);

    const store: Store = {
        voiceBlob,
        setVoiceBlob,

        nickname,
        setNickname,

        availablePoint,
        setAvailablePoint,

        usedPoint: maxPoint - availablePoint
    };

    useEffect(() => {
        const onApplyPoint = (data: { nickname: string, point: number }) => {
            if (nickname === data.nickname) {
                setAvailablePoint(data.point);
            }
        };

        if (nickname.length > 0) {
            socket.on('apply-point', onApplyPoint);

            // Request the amount of available points from the server.
            socket.emit('init-point', { socketid: socket.id, nickname: nickname });
        };

        return () => {
            socket.off('apply-point', onApplyPoint);
        };
    }, [nickname]);

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
