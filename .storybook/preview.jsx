import React from "react";

import { addDecorator } from "@storybook/react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: "#f5f5f5",
      },
      {
        name: "dark",
        value: "#424242",
      },
    ],
  },
};

const AppTheme = {
  palette: {
    primary: {
      main: "#008C88",
    },
    secondary: {
      main: "#940063",
    },
    error: {
      main: "#DE432E",
    },
    warning: {
      main: "#FFA825",
    },
    info: {
      main: "#2D73E4",
    },
    success: {
      main: "#5ba100",
    },
  },
};

addDecorator((story) => (
  <ThemeProvider theme={createMuiTheme(AppTheme)}>{story()}</ThemeProvider>
));
