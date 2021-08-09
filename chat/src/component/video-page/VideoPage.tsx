import React from 'react';

import { Page } from 'component/Page';
import { VideoWidget } from 'component/video-page/VideoWidget';
import { ChatWidget } from 'component/video-page/ChatWidget';

export const VideoPage = () => (
    <Page>
        <VideoWidget />
        <ChatWidget />
    </Page>
);
