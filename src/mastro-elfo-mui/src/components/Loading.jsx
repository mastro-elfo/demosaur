import { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Renders `children` after `delay` milliseconds when `show` goes `true`.
 *
 * Example:
 * ```jsx
 *  <Button onClick={handler} disabled={loading}>
 *    Send
 *    <Loading show={loading}>
 *      <AbsoluteCircularProgress/>
 *    </Loading>
 *  </Button>
 * ```
 *
 * `handler` sets `loading` to `true` and sends a message to a server. If the operation takes more than `delay` an `AbsoluteCircularProgress` is displayed.
 * When operation is complete `handler` sets `loading` to `false` to hide the component.
 *
 * @param       {[type]}  children     [description]
 * @param       {Number}  [delay=1000] [description]
 * @param       {Boolean} [show=false] [description]
 * @param       {[type]}  others       [description]
 * @constructor
 */

export default function Loading({
  children,
  // Wait for `delay` milliseconds
  delay = 1000,
  // Display `children`
  show = false,
  ...others
}) {
  // Display CircularProgress if innerLoading is true
  const [innerLoading, setInnerLoading] = useState(false);

  useEffect(() => {
    // Delay setting innerLoading
    if (show) {
      const to = setTimeout(setInnerLoading, delay, true);
      return () => clearTimeout(to);
    } else setInnerLoading(false);
  }, [delay, show]);

  return innerLoading ? children : null;
}

Loading.propTypes = {
  delay: PropTypes.number,
  show: PropTypes.bool
};
