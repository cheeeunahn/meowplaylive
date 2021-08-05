import React, { useState } from 'react';
import { css } from '@emotion/css';

import { CommonButton, CommonBox, commonColors, commonSizes, CommonInput } from './Common';

const buttonWidth = '6rem';

const Title = () => (
    <div className={css({
        fontSize: '2rem'
    })}>
        MeowPlayLive
    </div>
);

const Subtitle = () => (
    <div>
        Play with a cat and win a chance to get heard!
    </div>
);

const NicknameEditor = () => {
    const [inputValue, setInputValue] = useState('');
    const [nickname, setNickname] = useState('');
    const [isEditing, setEditing] = useState(true);

    return (
        <div className={css({
            marginBottom: '0.5rem'
        })}>
            <CommonInput
                className={css([
                    {
                        marginRight: '1rem',
                        '& .MuiInputBase-input': {
                            color: isEditing ? commonColors.black : commonColors.white,
                            zIndex: 100,
                            transition: 'color 0.5s'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            backgroundColor: isEditing ? '#ffffff' : 'transparent',
                            transition: 'background-color 0.5s, border-color 0.5s'
                        }
                    },
                    !isEditing && {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: `${commonColors.white} !important`,
                            borderWidth: '1px !important'
                        }
                    }
                ])}
                placeholder={'Nickname'}
                value={inputValue}
                isReadonly={!isEditing}
                onChange={value => {
                    setInputValue(value);
                }}
            />
            <CommonButton
                className={css({
                    width: buttonWidth
                })}
                buttonColor={commonColors.brown}
                onClick={() => {
                    setNickname(inputValue);
                    setEditing(!isEditing);
                }}
            >
                {isEditing ? 'Save' : 'Edit'}
            </CommonButton>
        </div>
    );
};

const ExitButton = () => (
    <CommonButton
        className={css({
            display: 'flex',
            alignItems: 'baseline',
            width: buttonWidth,
            marginLeft: 'auto' // Align right.
        })}
        buttonColor={commonColors.brown}
        onClick={() => {
            location.href = '../index.html';
        }}
    >
        <i className="fa fa-arrow-left" />&nbsp;Exit
    </CommonButton>
);

export const Header = () => (
    <CommonBox className={css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxSizing: 'border-box',
        width: '100%',
        paddingBottom: '1rem',
        borderRadius: 0,
        color: commonColors.white,
        backgroundColor: commonColors.black
    })}>
        <div className={css({
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: commonSizes.appWidth,
            maxWidth: '100%'
        })}>
            <div>
                <Title />
                <Subtitle />
            </div>
            <div className={css({
                marginLeft: 'auto' // Align right.
            })}>
                <NicknameEditor />
                <ExitButton />
            </div>
        </div>
    </CommonBox>
);
