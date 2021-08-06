import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { createRecorder } from 'util/RecorderUtils';

/**
 * States of the app & setter functions.
 */
interface Store {
    voiceRecorder: MediaRecorder | null,

    voiceBlob: Blob | null,
    setVoiceBlob: (value: Blob) => void,

    nickname: string,
    setNickname: (value: string) => void,

    point: number,
    setPoint: (value: number) => void
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
    const [voiceRecorder, setVoiceRecorder] = useState<MediaRecorder | null>(null);
    const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
    const [nickname, setNickname] = useState<string>('');
    const [point, setPoint] = useState<number>(500000);

    // When this component is rendered...
    useEffect(() => {
        (async () => {
            setVoiceRecorder(await createRecorder());
        })();
    }, []);

    const store: Store = {
        voiceRecorder,

        voiceBlob,
        setVoiceBlob,

        nickname,
        setNickname,

        point,
        setPoint
    };

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};