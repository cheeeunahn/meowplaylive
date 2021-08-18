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
    buttonColor?: string;
    className?: string;
}

export const EmojiSelector = ({ onSelect, buttonColor = '#ffffff', className }: Props) => (
    <div className={css([{
        width: '100%',
        textAlign: 'center',
        marginBottom: '1rem'
    }, className])}>
        {emojiTable.map((row, y) => (
            <div key={`${y}-${row.join('')}`}>
                {row.map((emoji, x) => (
                    <CommonButton
                        variant={'text'}
                        buttonColor={buttonColor}
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
