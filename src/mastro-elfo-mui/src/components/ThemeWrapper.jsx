import React from "react";

// Customize main theme
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

/**
 * Theme wrapper
 * @param       {[type]} children [description]
 * @param       {[type]} props    [description]
 * @constructor
 */
export default function ThemeWrapper({ children, ...props }) {
  // See https://material-ui.com/customization/theming/#createmuitheme-options-args-theme for details
  const THEME = createMuiTheme(props);
  return <MuiThemeProvider theme={THEME}>{children}</MuiThemeProvider>;
}
