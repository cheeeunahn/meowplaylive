import React from 'react';
import { css } from '@emotion/css';

import { CommonButton, youTubeColors } from 'component/Common';

const emojiTable = [
    ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣'],
    ['😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚'],
    ['😺', '😸', '😹', '😻', '😼', '😽', '😿', '😾']
];

interface Props {
    onSelect: (emoji: string) => void;
}

export const EmojiSelector = ({ onSelect }: Props) => (
    <div className={css({
        width: '100%',
        textAlign: 'center',
        marginBottom: '1rem'
    })}>
        {emojiTable.map((row, y) => (
            <div>
                {row.map((emoji, x) => (
                    <CommonButton
                        variant={'text'}
                        buttonColor={'#ffffff'}
                        key={`${y}-${x}-${emoji}`}
                        className={css({
                            cursor: 'pointer',
                            border: 'none',
                            outline: 'none',
                            borderRadius: '0.2rem',
                            width: '2rem',
                            height: '2rem',
                            minWidth: '0',
                            lineHeight: '2rem',
                            fontFamily: 'inherit',
                            fontSize: '1rem',
                            padding: 0
                        })}
                        onClick={() => {
                            onSelect(emoji);
                        }}
                    >
                        {emoji}
                    </CommonButton>
                ))}
            </div>
        ))}
    </div>
);
