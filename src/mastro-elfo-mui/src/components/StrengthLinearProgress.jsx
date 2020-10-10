import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { LinearProgress } from "@material-ui/core";

// Evaluate the strength of `password`
function evaluate(password) {
  // Short password: don't care about the content
  if (password.length === 0) return 0;
  if (password.length < 8) return 10;
  // Start from 10
  let s = 10;
  if (password.length > 11) s += 18;
  if (password.match(/[a-z]/)) s += 18;
  if (password.match(/[A-Z]/)) s += 18;
  if (password.match(/[0-9]/)) s += 18;
  if (password.match(/[^\w]/)) s += 18;
  // Just in case
  return Math.min(100, s);
}

/**
 * `LinearProgress` that shows the strength of a password.
 *
 * `password` is the string to be checked. Strength function is in progress.
 * `others` are passed to `LinearProgress`.
 * If component has children, this must be a function and the evaluated strength is passed.
 * @param       {[type]} children      [description]
 * @param       {String} [password=""] [description]
 * @param       {[type]} others        [description]
 * @constructor
 */
export default function StrengthLinearProgress({
  children,
  password = "",
  ...others
}) {
  const strength = evaluate(password);

  return (
    <Fragment>
      <LinearProgress variant="determinate" value={strength} {...others} />
      {children && children(strength)}
    </Fragment>
  );
}

StrengthLinearProgress.propTypes = {
  children: PropTypes.func,
  password: PropTypes.string
};
