import React, { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/css';
import { socket } from 'common/Connection';

const imageAnimation = keyframes({
    '0%': {
        opacity: 0,
        transform: 'scale(0)'
    },
    '20%': {
        opacity: 1,
        transform: 'scale(1)'
    },
    '50%': {
        opacity: 1
    },
    '100%': {
        opacity: 0
    }
});

const imageStyle = css({
    width: '20rem',
    opacity: 0,
    animation: `${imageAnimation} 1 5s`
});

interface Result {
    status: 'Default' | 'Success' | 'Fail';

    // For forcing re-rendering.
    count: number;
};

export const CatResultView = () => {
    const [result, setResult] = useState<Result>({ status: 'Default', count: 0 });

    useEffect(() => {
        socket.on('cat-tap-success', () => {
            setResult({ status: 'Success', count: result.count + 1 });
        });

        socket.on('cat-tap-fail', () => {
            setResult({ status: 'Fail', count: result.count + 1 });
        });
    }, []);

    return (
        <div className={css({
            zIndex: 5,
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        })}>
            {(result.status === 'Success') && (
                <img key={`${result.count}-${result.status}`} className={imageStyle} src={'./assets/success-image.png'} />
            )}
            {(result.status === 'Fail') && (
                <img key={`${result.count}-${result.status}`} className={imageStyle} src={'./assets/fail-image.png'} />
            )}
        </div>
    );
};
