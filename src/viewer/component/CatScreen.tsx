import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/css';

import { CommonBox } from './Common';
import { createSketch } from '../core/P5Manager';
import * as FishSketch from '../sketch/FishSketch';

export const CatScreen = () => {
    const ref = useRef(null);

    useEffect(() => {
        const Container = ref.current;

        if (Container !== null) {
            createSketch(Container, FishSketch);
        }
    }, []);

    return (
        <CommonBox className={css({
            flex: 1,
            padding: 0,
            marginBottom: '1rem'
        })}>
            <div
                className={css({
                    width: '100%',
                    height: '100%',
                    '& > canvas': {
                        maxWidth: '100%',
                        height: 'auto !important'
                    }
                })}
                ref={ref}
            />
        </CommonBox>
    );
};
