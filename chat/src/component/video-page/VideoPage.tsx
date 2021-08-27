import React from 'react';
import { css } from '@emotion/css';

import { CommonBox, commonColors } from 'component/Common';
import { Page } from 'component/Page';
import { VideoWidget } from 'component/video-page/VideoWidget';
import { ChatWidget } from 'component/video-page/ChatWidget';
import { PointView } from 'component/video-page/PointView';

export const VideoPage = () => (
    <Page>
        <CommonBox className={css({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '1000rem',
            height: '3rem',
            boxShadow: 'none',
            backgroundColor: commonColors.darkblue
        })}>
            <PointView />
        </CommonBox>
        <div className={css({
            position: 'absolute',
            marginTop: '5rem'
        })}>
            <VideoWidget />
            <ChatWidget />
        </div>
    </Page>
);
