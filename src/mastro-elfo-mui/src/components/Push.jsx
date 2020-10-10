import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

/**
 * Renders `Component` with `onClick` prop that calls pushes or replaces history with `href`.
 *
 * @param       {node}  children        [description]
 * @param       {string}  href            location to push
 * @param       {Boolean} [replace=false] If `true` uses `replace` instead of `push`
 * @param       {node}  Component       Component rendered
 * @param       {any}  rest            Passed to Component
 * @constructor
 */

export default function Push({
  children,
  href,
  replace = false,
  Component,
  ...rest
}) {
  const { push, replace: repl } = useHistory();
  return (
    <Component onClick={() => (replace ? repl(href) : push(href))} {...rest}>
      {children}
    </Component>
  );
}

Push.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  replace: PropTypes.bool,
  Component: PropTypes.elementType
};
