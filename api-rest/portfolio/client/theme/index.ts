import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import {
  amber,
  blue,
  green,
  grey,
  orange,
  pink,
} from "@material-ui/core/colors";
import { createMuiTheme, Theme } from "@material-ui/core/styles";

import { ThemeModeEnum } from "./models";

const palettes = {
  [ThemeModeEnum.Dark]: {
    primary: { main: grey[200] },
    secondary: { main: orange[400] },
    type: "dark",
  },
  [ThemeModeEnum.Light]: {
    primary: { main: grey[800] },
    secondary: { main: orange[400] },
    type: "light",
  },
};

const commonPalette = {
  primary: {
    main: blue[600],
  },
  secondary: {
    main: pink[600],
  },
  success: {
    main: green[600],
  },
  warning: {
    main: amber[700],
  },
};

const themeBuilder = (mode: ThemeModeEnum): Theme =>
  createMuiTheme({
    palette: {
      ...commonPalette,
      ...palettes[mode],
    } as PaletteOptions,
  });

export default themeBuilder;
