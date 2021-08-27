import React, { useContext } from 'react';
import { css } from '@emotion/css';

import { StoreContext } from 'component/Store';

export const VideoWidget = () => {
    const { videoID } = useContext(StoreContext);

    return (
        <iframe
            className={css({
                display: 'inline-block',
                verticalAlign: 'top',
                marginRight: '1rem',
                marginBottom: '1rem'
            })}
            width="820"
            height="575"
            frameBorder="0"
            allowFullScreen={true}
            src={`https://www.youtube.com/embed/${videoID}`}
        />
    );
};
