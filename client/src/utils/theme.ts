import { DefaultTheme } from 'styled-components';
import { ThemeEnums } from '../types/styled';

export const baseTheme = {
    mainColor: '#71aaeb',
};

export const darkTheme: DefaultTheme = {
    type: ThemeEnums.dark,
    ...baseTheme,
    colors: {
        componentBg: '#222222',
        font: '#ffffff',
        bg: '#141414',
        hover: '#262626',
        border: '#424242',
        input: '#424242',
    },
};

export const lightTheme: DefaultTheme = {
    type: ThemeEnums.light,
    ...baseTheme,
    colors: {
        bg: '#edeef0',
        componentBg: '#ffffff',
        font: '#000000',
        border: '#dce1e6',
        input: '#edeef0',
        hover: '#e5e7eb',
    },
};
