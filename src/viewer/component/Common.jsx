import React from 'react';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { css } from '@emotion/css';

/**
 * Color palette for the whole application.
 */
export const commonPalette = {
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
 */
export const CommonCard = ({
    className = '',
    children
}) => {
    const defaultStyle = css({
        boxSizing: 'border-box',
        padding: '2rem'
    });

    return (
        <Card className={css([defaultStyle, className])}>
            {children}
        </Card>
    );
};

/**
 * Button component.
 *
 * @param buttonColor Color of the button
 * @param isDisabled Disable the button or not
 * @param onClick The function to run when the button is clicked
 * @param className Style to override
 */
export const CommonButton = ({
    buttonColor = commonPalette.blue,
    isDisabled = false,
    onClick = () => { },
    className = '',
    children
}) => {
    const defaultStyle = css({
        fontFamily: 'inherit',
        // Stop Material from changing the text to uppercase.
        textTransform: 'none',
        fontSize: 'inherit',
        color: commonPalette.white,
        backgroundColor: buttonColor,
        '&:hover': {
            backgroundColor: darken(buttonColor, 0.2)
        },
        '&:disabled': {
            backgroundColor: lighten(buttonColor, 0.2)
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
    className = ''
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
 * @param min First value of the slider.
 * @param max Last value of the slider.
 * @param step Distance between the marks.
 * @param value Current value.
 * @param onChange The function to run when the slider is moved.
 * @param className Style to override
 */
export const CommonSlider = ({
    min,
    max,
    step,
    value,
    onChange,
    className = ''
}) => (
    <Slider
        className={className}
        min={min}
        max={max}
        value={value}
        step={step}
        marks={true}
        onChange={onChange}
    />
);
