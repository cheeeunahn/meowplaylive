import React, { useContext } from 'react';

import { StoreContext } from 'component/Store';
import { Page } from 'component/Page';

export const VideoPage = () => {
    const { videoID } = useContext(StoreContext);

    return (
        <Page>
            <iframe
                width="560"
                height="315"
                frameBorder="0"
                allowFullScreen={true}
                src={`https://www.youtube.com/embed/${videoID}`}
            />
        </Page>
    );
};
