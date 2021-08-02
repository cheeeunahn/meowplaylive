import React from 'react';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import { css } from '@emotion/css';

export const commonSizes = {
    // Our guess of proper content width.
    appWidth: '600px'
};

/**
 * Color palette for the whole application.
 */
export const commonColors = {
    black: '#3c4449',
    brown: '#824a48',
    blue: '#2e588e',
    pink: '#f48fb1',
    green: '#0a7073',
    white: '#e5e5e5'
};

/**
 * Simple 'box'.
 *
 * @param fillWidth Fill the parent's width or not
 * @param className Style to override
 * @param children Child component
 */
export const CommonBox = ({
    className,
    children
}) => {
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

/**
 * Button component.
 *
 * @param buttonColor Color of the button
 * @param isDisabled Disable the button or not
 * @param onClick The function to run when the button is clicked
 * @param className Style to override
 * @param children Child component
 */
export const CommonButton = ({
    buttonColor = commonColors.blue,
    isDisabled = false,
    onClick,
    className,
    children
}) => {
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

export const CommonIconButton = ({
    buttonColor = null,
    isDisabled = false,
    onClick,
    className,
    children
}) => {
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

/**
 * Text input component.
 *
 * @param value Current text.
 * @param onChange The function to run when the text is changed.
 * @param className Style to override
 */
export const CommonInput = ({
    value,
    onChange,
    className
}) => {
    const defaultStyle = css({
        fontFamily: 'inherit',
        fontSize: 'inherit !important'
    });

    return (
        <Input
            className={css([defaultStyle, className])}
            value={value}
            onChange={onChange}
        />
    );
};

/**
 * Slider component.
 *
 * @param showMark Show the marks or not.
 * @param showThumb Show the thumb or not.
 * @param isReadonly Allow or disallow the user to move the thumb.
 * @param min First value of the slider.
 * @param max Last value of the slider.
 * @param step Distance between the marks.
 * @param value Current value.
 * @param onChange The function to run when the slider is moved.
 * @param className Style to override
 */
export const CommonSlider = ({
    showMark = true,
    showThumb = true,
    isReadonly = false,
    min,
    max,
    step,
    value,
    onChange,
    className
}) => {
    const defaultStyle = css([
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
            onChange={onChange}
        />
    );
};

/**
 * Component which is overlapped on the page.
 * (ex. Dialog)
 *
 * @param isOpen Show or hide the component
 * @param onClose Called when the component is hidden
 * @param children Child component
 */
export const CommonModal = ({
    isOpen,
    onClose,
    children
}) => (
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
