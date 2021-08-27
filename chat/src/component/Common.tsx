import React, { ReactNode } from 'react';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { css, cx } from '@emotion/css';

// Basic colors.
export const commonColors = {
    black: '#3c4449',
    brown: '#824a48',
    blue: '#2e588e',
    pink: '#f48fb1',
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

// Based on YouTube.
export const youTubeColors = {
    transparentGray: 'rgba(17, 17, 17, 0)',
    veryLightGray: 'rgba(17, 17, 17, 0.2)',
    lightGray: 'rgba(17, 17, 17, 0.4)',
    gray: 'rgba(17, 17, 17, 0.6)',
    darkGray: 'rgb(17, 17, 17, 0.8)',
    lightBlue: 'hsl(206.1, 79.3%, 52.7%)'
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
            boxShadow={3}
        >
            {children}
        </Box>
    );
};

interface CommonButtonProps {
    buttonColor?: string;
    variant?: 'text' | 'outlined' | 'contained';
    isDisabled?: boolean;
    onClick?: () => void;
    className?: string;
    children: ReactNode;
}

export const CommonButton = ({
    buttonColor = commonColors.darkblue,
    variant = 'contained',
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
            variant={variant}
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
    variant?: 'standard' | 'outlined' | 'filled';
    label?: string;
    placeholder?: string;
    value?: string;
    isReadonly?: boolean;
    onChange?: (value: string) => void;
    onKeyPress?: (key: string) => void;
    className?: string;
    tabIndex?: number;
}

export const CommonInput = ({
    size = 'small',
    variant = 'outlined',
    label,
    placeholder,
    value,
    isReadonly,
    onChange,
    onKeyPress,
    tabIndex = -1,
    className
}: CommonInputProps) => {
    const defaultStyle = css({
        fontFamily: 'inherit',
        fontSize: 'inherit !important',
        width: '25rem'
    });

    return (
        <TextField
            className={css([defaultStyle, className])}
            size={size}
            variant={variant}
            label={label}
            placeholder={placeholder}
            value={value}
            InputProps={{
                readOnly: isReadonly
            }}
            onChange={event => {
                onChange && onChange(event.target.value);
            }}
            onKeyPress={event => {
                onKeyPress && onKeyPress(event.key);
            }}
            tabIndex={tabIndex}
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
    sliderColor = commonColors.blue,
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
            fontSize: '1.5rem',
            width: '3rem',
            height: '3rem'
        })}
        onClick={onClick}
    >
        X
    </CommonIconButton>
);

interface CommonProfileProps {
    profileColor: string;
    className?: string;
}

export const CommonProfile = ({ profileColor, className }: CommonProfileProps) => (
    <div className={css({
        display: 'inline-block',
        width: '1.5rem',
        marginRight: '1rem'
    })}>
        <i
            className={cx(
                'fa', 'fa-user',
                css([{
                    display: 'inline-block',
                    verticalAlign: 'top',
                    width: '1.5rem',
                    height: '1.5rem',
                    // This put the text at the center of the vertical axis.
                    lineHeight: '1.5rem',
                    fontSize: '1rem',
                    textAlign: 'center',
                    color: '#ffffff',
                    backgroundColor: profileColor,
                    borderRadius: '50%'
                }, className])
            )}
            aria-hidden={true}
        />
    </div>
);
