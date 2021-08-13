import React from 'react';
import { css, cx } from '@emotion/css';

import { CommonButton, youTubeColors } from 'component/Common';

interface Props {
    onOpenDonationSelector: () => void;
    onClose: () => void;
}

const buttonStyle = css({
    width: '100%',
    height: '4rem',
    paddingLeft: '2rem',
    color: youTubeColors.darkGray,
    textTransform: 'none',
    borderRadius: 0,
    justifyContent: 'left'
});

const iconStyle = css({
    width: '1.5rem',
    marginRight: '1rem'
});

const xStyle = cx('fa', 'fa-times', iconStyle, css({
    fontSize: '1.2rem'
}));

const starStyle = cx('fa', 'fa-star', iconStyle, css({
    height: '1.2rem',
    lineHeight: '1.2rem',
    borderRadius: '0.2rem',
    fontSize: '0.8rem',
    color: '#ffffff',
    backgroundColor: youTubeColors.lightGray
}));

const labelStyle = css({
    textAlign: 'left'
});

const messageStyle = css({
    textAlign: 'left',
    color: youTubeColors.gray,
    fontSize: '0.8rem'
});

export const SpecialChatMenu = ({ onOpenDonationSelector, onClose }: Props) => (
    <div className={css({
        zIndex: 100,
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: '0.5rem',
        marginBottom: '0.5rem'
    })}>
        <div className={css({
            boxSizing: 'border-box',
            padding: '1.5rem 2rem',
            color: youTubeColors.gray
        })}>
            Show support for the streamer
        </div>
        <CommonButton
            className={buttonStyle}
            variant={'text'}
            buttonColor={'rgba(255, 255, 255, 0)'}
            onClick={() => {
                onOpenDonationSelector();
            }}
        >
            <i className={starStyle} aria-hidden={true} />
            <div>
                <div className={labelStyle}>Super Chat</div>
                <div className={messageStyle}>Send a highlighted message</div>
            </div>
        </CommonButton>
        <CommonButton
            className={buttonStyle}
            variant={'text'}
            buttonColor={'rgba(255, 255, 255, 0)'}
            onClick={() => {
                onClose();
            }}
        >
            <i className={xStyle} aria-hidden={true} />
            <div>
                <div className={labelStyle}>Close</div>
            </div>
        </CommonButton>
    </div>
);
