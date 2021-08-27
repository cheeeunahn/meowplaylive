import React, { useContext, useState } from 'react';
import { css } from '@emotion/css';

import { CommonInput, commonColors, CommonButton } from 'component/Common';
import { StoreContext } from 'component/Store';
import { validateNickname } from 'common/StringUtils';

export const NicknameEditor = () => {
    const { nickname, setNickname } = useContext(StoreContext);

    const [currentNickname, setCurrentNickname] = useState<string>(nickname);
    const [isEditing, setEditing] = useState<boolean>(true);

    return (
        <span className={css({
            marginBottom: '0.5rem'
        })}>
            <CommonInput
                className={css([
                    {
                        marginRight: '0.8rem',
                        '& .MuiInputBase-input': {
                            color: isEditing ? commonColors.darkblue : commonColors.white,
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
                            //borderColor: `${commonColors.white} !important`,
                            fontStyle: 'bold',
                            borderWidth: '0px !important',
                            backgroundColor: '#6030c2 !important'
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
                buttonColor={commonColors.darkblue}
                isDisabled={!validateNickname(currentNickname)}
                onClick={() => {
                    setNickname(currentNickname);
                    setEditing(!isEditing);
                }}
            >
                {isEditing ? '💾Save' : '✏️Edit'}
            </CommonButton>
        </span>
    );
};
