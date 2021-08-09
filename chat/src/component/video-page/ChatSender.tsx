import React, { useContext } from 'react';
import { css, cx } from '@emotion/css';

import { CommonInput, moreCommonColors } from 'component/Common';
import { StoreContext } from 'component/Store';

const iconColor = moreCommonColors.gray;

export const ChatSender = () => {
    const { profileColor, nickname } = useContext(StoreContext);

    return (
        <div className={css({
            boxSizing: 'border-box',
            width: '100%',
            backgroundColor: '#eeeeee',
            padding: '0.5rem 2rem'
        })}>
            <div className={css({
                marginBottom: '0.5rem'
            })}>
                <i
                    className={cx(
                        'fa', 'fa-user',
                        css({
                            display: 'inline-block',
                            verticalAlign: 'top',
                            width: '1rem',
                            height: '1rem',
                            marginRight: '1rem',
                            textAlign: 'center',
                            color: profileColor,
                            border: '1px solid #000000',
                            borderRadius: '50%'
                        })
                    )}
                    aria-hidden={true}
                />
                <div className={css({
                    display: 'inline-block'
                })}>
                    <div className={css({
                        color: moreCommonColors.gray,
                        marginBottom: '0.5rem'
                    })}>
                        {nickname}
                    </div>
                    <CommonInput
                        variant={'standard'}
                        placeholder={'Say something'}
                    />
                </div>
            </div>
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                width: '100%'
            })}>
                <i
                    className={cx('fa', 'fa-smile-o',
                        css({
                            color: iconColor,
                            marginRight: '1rem'
                        })
                    )}
                    aria-hidden={true}
                />
                <i
                    className={cx('fa', 'fa-usd',
                        css({
                            color: iconColor
                        })
                    )}
                    aria-hidden={true}
                />
            </div>
        </div>
    );
};
