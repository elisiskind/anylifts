import React from 'react';

import {addDecorator} from '@storybook/react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {AppTheme} from "../src/App";

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    backgrounds: {
        default: 'light',
        values: [
            {
                name: 'light',
                value: '#f5f5f5',
            },
            {
                name: 'dark',
                value: '#424242'
            }
        ],
    },
}

addDecorator((story) => (
    <ThemeProvider theme={createMuiTheme(AppTheme)}>{story()}</ThemeProvider>
));