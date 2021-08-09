import React, { useContext, useState } from 'react';
import { css } from '@emotion/css';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';

import { StoreContext } from 'component/Store';
import { Page } from 'component/Page';

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
                <TextField
                    variant={'outlined'}
                    value={currentVideoURL}
                    onChange={event => {
                        setCurrentVideoURL(event.target.value);
                    }}
                />
            </div>
            <div className={formStyle}>
                <span className={labelStyle}>Nickname:</span>
                <TextField
                    variant={'outlined'}
                    value={currentNickname}
                    onChange={event => {
                        setCurrentNickname(event.target.value);
                    }}
                />
            </div>
            <Button
                color={'primary'}
                variant={'contained'}
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
            </Button>
        </Page>
    );
};
