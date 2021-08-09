import React, { useContext, useState } from 'react';
import { css } from '@emotion/css';

import { StoreContext } from 'component/Store';
import { Page } from 'component/Page';
import { CommonButton, CommonInput } from 'component/Common';

function parseVideoURL(url: string) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : null;
}

const formStyle = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1rem'
});

const labelStyle = css({
    display: 'inline-block',
    width: '7rem'
});

export const LandingPage = () => {
    const { setVideoID, setNickname, setPage } = useContext(StoreContext);

    const [currentVideoURL, setCurrentVideoURL] = useState<string>('');
    const [currentNickname, setCurrentNickname] = useState<string>('');

    return (
        <Page className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
        })}>
            <div className={formStyle}>
                <span className={labelStyle}>YouTube URL:</span>
                <CommonInput
                    value={currentVideoURL}
                    onChange={value => {
                        setCurrentVideoURL(value);
                    }}
                />
            </div>
            <div className={formStyle}>
                <span className={labelStyle}>Nickname:</span>
                <CommonInput
                    value={currentNickname}
                    onChange={value => {
                        setCurrentNickname(value);
                    }}
                />
            </div>
            <CommonButton
                onClick={() => {
                    const currentVideoID = parseVideoURL(currentVideoURL);

                    if (currentVideoID === null) {
                        alert('Please input a valid YouTube URL!');
                        return;
                    }

                    if (currentNickname.length === 0) {
                        alert('Please input a nickname!');
                    }

                    setVideoID(currentVideoID);
                    setNickname(currentNickname);
                    setPage('VideoPage');
                }}
            >
                Submit
            </CommonButton>
        </Page>
    );
};
