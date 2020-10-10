/**
 * Provides two components to control what is shown on screen and printed.
 */

import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  print: {
    "@media screen": {
      display: "none"
    }
  },
  noPrint: {
    "@media print": {
      display: "none"
    }
  }
});

/**
 * Children inside `Print` are not shown on screen.
 */
export function Print({ children }) {
  const classes = useStyles();
  return <div className={classes.print}>{children}</div>;
}

/**
 * Children inside `NoPrint` are not printed.
 */
export function NoPrint({ children }) {
  const classes = useStyles();
  return <div className={classes.noPrint}>{children}</div>;
}
