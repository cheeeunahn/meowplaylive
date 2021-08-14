import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/css';

import { setSketch } from 'common/Sketch';
import { CommonBox } from 'component/Common';
import * as FishSketch from 'sketch/FishSketch';
import { CatResultView } from 'component/content/CatResultView';
import { socket } from 'common/Connection'

export const CatScreen = () => {
    const ref = useRef(null);

    useEffect(() => {
        const Container = ref.current;

        if (Container !== null) {
            setSketch(Container, FishSketch);
        }
    }, []);

    return (
        <CommonBox className={css({
            position: 'relative',
            flex: 1,
            padding: 0,
            marginBottom: '1rem'
        })}>
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    '& > canvas': {
                        maxWidth: '100%',
                        height: 'auto !important'
                    }
                })}
                ref={ref}
            />
            <CatResultView />
        </CommonBox>
    );
};
