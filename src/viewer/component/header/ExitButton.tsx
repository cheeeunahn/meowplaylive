import React from 'react';
import { css } from '@emotion/css';

import { CommonButton, commonColors } from 'component/Common';

export const ExitButton = () => (
    <CommonButton
        className={css({
            display: 'inline-flex',
            alignItems: 'baseline',
            width: '6rem',
            marginLeft: '1rem'
        })}
        buttonColor={commonColors.brown}
        onClick={() => {
            location.href = '../index.html';
        }}
    >
        <i className="fa fa-arrow-left" />&nbsp;Exit
    </CommonButton>
);
