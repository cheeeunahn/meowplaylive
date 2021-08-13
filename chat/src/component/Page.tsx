import React, { ReactNode } from 'react';
import { css } from '@emotion/css';

interface Props {
    className?: string;
    children: ReactNode;
}

export const Page = ({ className, children }: Props) => (
    <div className={css([{
        /*width: '100%'*/
        width: '760px',
        flex: 1
    }, className])}>
        {children}
    </div>
);
