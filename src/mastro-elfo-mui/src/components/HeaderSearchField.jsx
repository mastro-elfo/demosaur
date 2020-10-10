import React from "react";
import classNames from "classnames";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchField from "./SearchField";

const useStyles = makeStyles(theme => ({
  AppBarSearch: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    }
  },
  AppBarInput: {
    color: "inherit"
  }
}));

/**
 * A `SearchField` styled to stay inside `Header`.
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
export default function(props) {
  const classes = useStyles();

  return (
    <SearchField
      variant="standard"
      InputProps={{
        classes: {
          root: classNames({ [classes.AppBarInput]: appBar })
        },
        ...(appBar && { disableUnderline: true })
      }}
      {...props}
    />
  );
}
