import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Fab, useScrollTrigger, Zoom } from "@material-ui/core";

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles(theme => ({
  Fab: {
    position: "fixed",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: theme.zIndex.modal
  }
}));

/**
 * A `Fab` that zooms in when the page is scolled and scrolls to top when clicked.
 * @param       {Number} [threshold=100] [description]
 * @param       {[type]} others          [description]
 * @constructor
 */
export default function TopFab({ threshold = 100, ...others }) {
  const classes = useStyles();
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold });

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={trigger}>
      <Fab onClick={handleClick} className={classes.Fab} {...others}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}

TopFab.propTypes = {
  // Minimum scroll before show the button
  threshold: PropTypes.number
};
