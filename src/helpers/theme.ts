import { createTheme } from "@mui/material";

const defaultBreakpoints = createTheme().breakpoints;

const {
  breakpoints,
} = createTheme({
  breakpoints: {
    values: {
      ...defaultBreakpoints.values,
      lg: 1440,
    },
  }
});

const THEME = {
  colors: {
    BG_DARK: '#181818',
    BG_LIGHT: '#1b1b1b',
    BORDER: '#f8f8f8',
    BORDER_HOVER: '#ff9b33'
  },
  breakpoints,
};

export default THEME;
