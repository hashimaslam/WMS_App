import { createMuiTheme, colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";
import breakpoints from "./breakpoints";
import overrides from "./overrides";
const theme = createMuiTheme({
  palette: {
    background: {
      dark: "#F4F6F8",
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: colors.indigo[500],
      light: "#757ce8",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      main: colors.indigo[500],
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
    textGrey: {
      primary: "#546e7a",
    },
    purpleBg: {
      primary: "#3523c2",
      secondary: "#cbc8e3",
    },
    action: {
      hover: "#cbc8e3",
    },
  },
  breakpoints,
  shadows,
  typography,
  overrides,
});

export default theme;
