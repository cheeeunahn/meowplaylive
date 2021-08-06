import React, { useContext, useState } from 'react';
import { css } from '@emotion/css';

import { CommonInput, commonColors, CommonButton } from 'component/Common';
import { StoreContext } from 'component/Store';

export const NicknameEditor = () => {
    const { nickname, setNickname } = useContext(StoreContext);

    const [currentNickname, setCurrentNickname] = useState<string>(nickname);
    const [isEditing, setEditing] = useState<boolean>(true);

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
                value={currentNickname}
                isReadonly={!isEditing}
                onChange={value => {
                    setCurrentNickname(value);
                }}
            />
            <CommonButton
                className={css({
                    width: '6rem'
                })}
                buttonColor={commonColors.brown}
                isDisabled={currentNickname.length === 0}
                onClick={() => {
                    setNickname(currentNickname);
                    setEditing(!isEditing);
                }}
            >
                {isEditing ? 'Save' : 'Edit'}
            </CommonButton>
        </div>
    );
};
