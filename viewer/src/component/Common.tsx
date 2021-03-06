import React, { ReactNode } from 'react';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { css } from '@emotion/css';

// Basic colors.
export const commonColors = {
    black: '#3c4449',
    purple: '#9d6ffc',
    brown: '#824a48',
    blue: '#2e588e',
    pink: '#ff9cee',
    green: '#0a7073',
    white: '#e5e5e5',
    darkblue: '#5664e8'
};

// Additional colors.
export const moreCommonColors = {
    yellow: '#ffd700',
    gray: '#c0c0c0',
    lightBrown: '#cd7f32'
};

interface CommonBoxProps {
    className?: string;
    children: ReactNode;
}

export const CommonBox = ({ className, children }: CommonBoxProps) => {
    const defaultStyle = css({
        boxSizing: 'border-box',
        padding: '2rem'
    });

    return (
        <Box
            className={css([defaultStyle, className])}
            boxShadow={2}
        >
            {children}
        </Box>
    );
};

interface CommonButtonProps {
    buttonColor?: string;
    isDisabled?: boolean;
    onClick?: () => void;
    className?: string;
    children: ReactNode;
}

export const CommonButton = ({
    buttonColor = commonColors.blue,
    isDisabled = false,
    onClick,
    className,
    children
}: CommonButtonProps) => {
    const defaultStyle = css({
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: '#ffffff',
        backgroundColor: buttonColor,
        '&:hover': {
            backgroundColor: darken(buttonColor, 0.2)
        },
        '&:disabled': {
            color: '#ffffff',
            backgroundColor: commonColors.white
        }
    });

    return (
        <Button
            className={css([defaultStyle, className])}
            variant={'contained'}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
        </Button>
    );
};

interface CommonIconButtonProps {
    buttonColor?: string;
    isDisabled?: boolean;
    onClick?: () => void;
    className?: string;
    children: ReactNode;
}

export const CommonIconButton = ({
    buttonColor,
    isDisabled = false,
    onClick,
    className,
    children
}: CommonIconButtonProps) => {
    const defaultStyle = css([
        {
            fontFamily: 'inherit',
            fontSize: 'inherit'
        },
        buttonColor && {
            color: '#ffffff',
            backgroundColor: buttonColor,
            '&:hover': {
                backgroundColor: darken(buttonColor, 0.2)
            },
            '&:disabled': {
                color: '#ffffff',
                backgroundColor: commonColors.white
            }
        }
    ]);

    return (
        <IconButton
            className={css([defaultStyle, className])}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
        </IconButton>
    );
};

interface CommonInputProps {
    size?: 'small' | 'medium';
    label?: string;
    placeholder?: string;
    value?: string;
    isReadonly?: boolean;
    onChange?: (value: string) => void;
    className?: string;
}

export const CommonInput = ({
    size = 'small',
    label,
    placeholder,
    value,
    isReadonly,
    onChange,
    className
}: CommonInputProps) => {
    const defaultStyle = css({
        fontFamily: 'inherit',
        fontSize: 'inherit !important'
    });

    return (
        <TextField
            className={css([defaultStyle, className])}
            size={size}
            variant={'outlined'}
            label={label}
            placeholder={placeholder}
            value={value}
            InputProps={{
                readOnly: isReadonly
            }}
            onChange={event => {
                onChange && onChange(event.target.value);
            }}
        />
    );
};

interface CommonSliderProps {
    sliderColor?: string;
    showMark?: boolean;
    showThumb?: boolean;
    isReadonly?: boolean;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    onChange?: (value: number) => void;
    className?: string;
}

export const CommonSlider = ({
    sliderColor = commonColors.darkblue,
    showMark = true,
    showThumb = true,
    isReadonly = false,
    min,
    max,
    step,
    value,
    onChange,
    className
}: CommonSliderProps) => {
    const defaultStyle = css([
        {
            '& .MuiSlider-track': {
                backgroundColor: sliderColor
            },
            '& .MuiSlider-thumb': {
                backgroundColor: sliderColor
            }
        },
        !showThumb && {
            '& .MuiSlider-thumb': {
                display: 'none'
            }
        },
        isReadonly && {
            cursor: 'default'
        }
    ]);

    return (
        <Slider
            className={css([defaultStyle, className])}
            min={min}
            max={max}
            value={value}
            step={step}
            marks={showMark}
            onChange={(event, value) => {
                onChange && onChange(value as number);
            }}
        />
    );
};

interface CommonModalProps {
    isOpen: boolean;
    onClose?: () => void;
    children: ReactNode;
}

export const CommonModal = ({
    isOpen,
    onClose,
    children
}: CommonModalProps) => (
    <Dialog
        className={css({
            '& .MuiDialog-paper': {
                borderRadius: 0
            }
        })}
        open={isOpen}
        onClose={onClose}
    >
        {children}
    </Dialog>
);

interface CommonCloseButtonProps {
    onClick?: () => void;
}

export const CommonCloseButton = ({ onClick }: CommonCloseButtonProps) => (
    <CommonIconButton
        className={css({
            fontSize: '2rem',
            width: '3rem',
            height: '3rem'
        })}
        onClick={onClick}
    >
        <i className="fa fa-times-circle"></i>
    </CommonIconButton>
);

interface CommonPlayButtonProps {
    mode: 'Play' | 'Stop';
    size?: string;
    fontSize?: string;
    onClick?: () => void;
}

export const CommonPlayButton = ({ mode, size = '4rem', fontSize = '2rem', onClick }: CommonPlayButtonProps) => (
    <CommonIconButton
        className={css({
            width: size,
            height: size,
            fontSize: fontSize,
            lineHeight: fontSize
        })}
        buttonColor={commonColors.purple}
        onClick={onClick}
    >
        {(mode === 'Play') ? <i className="fa fa-play" /> : <i className="fa fa-stop" />}
    </CommonIconButton>
);
