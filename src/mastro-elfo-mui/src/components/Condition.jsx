/**
 * Development
 *
 * Renders `children` if `show` is `true`.
 *
 * `alt` defaults to `null` and is rendered when `show` is `false`.
 * If `show` is a function, it is evaluated and its return value is used as condition.
 */

import PropTypes from "prop-types";

export default function Condition({ alt = null, children, show = false }) {
  const condition = !!(typeof show === "function" ? show() : show);
  return condition ? children : alt;
}

Condition.propTypes = {
  alt: PropTypes.node,
  children: PropTypes.node,
  show: PropTypes.any
};
