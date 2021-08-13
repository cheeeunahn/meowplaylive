import React from 'react';
import { css } from '@emotion/css';
import { youTubeColors } from 'component/Common';

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
                    <button
                        key={`${y}-${x}-${emoji}`}
                        className={css({
                            cursor: 'pointer',
                            border: 'none',
                            outline: 'none',
                            borderRadius: '0.2rem',
                            width: '2rem',
                            height: '2rem',
                            lineHeight: '2rem',
                            fontFamily: 'inherit',
                            fontSize: '1rem',
                            padding: 0,
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: youTubeColors.veryLightGray
                            }
                        })}
                        onClick={() => {
                            onSelect(emoji);
                        }}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        ))}
    </div>
);
