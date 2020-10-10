import React from "react";
import PropTypes from "prop-types";

/**
 * Conditionally renders `Component` or `Alt`
 * @param       {node} Component [description]
 * @param       {node} [Alt=()=>null]   [description]
 * @constructor
 */
export default function Conditional({
  Component,
  Alt = () => null,
  show = false,
  ...others
}) {
  return Boolean(typeof show === "function" ? show() : show) ? (
    <Component {...others} />
  ) : (
    <Alt />
  );
}

Conditional.propTypes = {
  Component: PropTypes.elementType.isRequired,
  Alt: PropTypes.elementType,
  show: PropTypes.any
};
