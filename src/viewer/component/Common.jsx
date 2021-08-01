import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createTheme from '@material-ui/core/styles/createTheme';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { css } from '@emotion/css';

/**
 * Color palette for the whole application.
 */
export const commonColorMap = {
    black: '#3c4449',
    brown: '#824a48',
    blue: '#2e588e',
    pink: '#f48fb1',
    green: '#0a7073',
    white: '#e5e5e5'
};

const brightTheme = createTheme({
    palette: {
        type: 'light'
    }
});

const darkTheme = createTheme({
    palette: {
        type: 'dark'
    }
});

/**
 * Wrap the components with this to set their theme easily.
 *
 * @param isBright Set the childs bright/dark.
 */
export const CommonTheme = ({ isBright = true, children }) => (
    <ThemeProvider theme={isBright ? brightTheme : darkTheme}>
        {children}
    </ThemeProvider>
);

/**
 * Simple 'box'.
 *
 * @param fillWidth Fill the parent's width or not
 * @param className Style to override
 */
export const CommonCard = ({
    fillWidth = true,
    className = '',
    children
}) => {
    const defaultStyle = css({
        width: fillWidth ? '100%' : 'auto',
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
 * @param fillWidth Fill the parent's width or not
 * @param isDisabled Disable the button or not
 * @param onClick The function to run when the button is clicked
 * @param className Style to override
 */
export const CommonButton = ({
    fillWidth = false,
    isDisabled = false,
    onClick = () => { },
    className = '',
    children
}) => {
    const defaultStyle = css({
        width: fillWidth ? '100%' : 'auto',
        fontFamily: 'inherit',
        // Stop Material from changing the text to uppercase.
        textTransform: 'none !important',
        fontSize: 'inherit !important'
    });

    return (
        <Button
            className={css([defaultStyle, className])}
            color={'primary'}
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
