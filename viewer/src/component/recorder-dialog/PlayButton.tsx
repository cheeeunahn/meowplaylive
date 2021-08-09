import React from 'react';
import { css } from '@emotion/css';

import { commonColors, CommonIconButton } from 'component/Common';

interface Props {
    mode: 'Play' | 'Stop';
    onClick: () => void;
}

export const PlayButton = ({ mode, onClick }: Props) => (
    <CommonIconButton
        className={css({
            width: '3rem',
            height: '3rem',
            fontSize: '1.5rem',
            lineHeight: '1.5rem',
            marginBottom: '1rem'
        })}
        buttonColor={commonColors.green}
        onClick={onClick}
    >
        {(mode === 'Play') ? <i className="fa fa-play" /> : <i className="fa fa-stop" />}
    </CommonIconButton>
);
