import React, { useState } from 'react';
import { css, keyframes } from '@emotion/css';

import { CommonCard, CommonTheme } from './Common';
import { Header } from './Header';
import { HomeScreen } from './HomeScreen';
import { RecordScreen } from './RecordScreen';

const openAnimation = keyframes({
    '0%': {
        marginRight: '-300px'
    },
    '100%': {
        marginRight: '2rem'
    }
});

export const App = () => {
    // Name of the current screen. (ex. 'home', 'money')
    const [screen, setScreen] = useState('home');
    // Amount of donation.
    const [money, setMoney] = useState(0);
    // Audio file recorded by the user.
    const [voice, setVoice] = useState(null);

    const screenMap = {
        home: HomeScreen,
        record: RecordScreen
    };

    const CurrentScreen = screenMap[screen];

    return (
        <CommonTheme isBright={true}>
            <CommonCard fillWidth={false} className={css({
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
                height: '500px',
                marginRight: '2rem',
                fontSize: '16px',
                animation: `${openAnimation} 1s 1`,
            })}>
                <Header />
                <CurrentScreen
                    screen={screen}
                    setScreen={setScreen}
                    money={money}
                    setMoney={setMoney}
                    voice={voice}
                    setVoice={setVoice}
                />
            </CommonCard>
        </CommonTheme>
    );
};
