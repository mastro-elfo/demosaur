import { useEffect, useState } from "react";

/**
 * Creates a countdown timer from `start` to 0.
 *
 * Returns `value` and a function to reset the timer.
 *
 * @param  {Number} start        Starting point
 * @param  {Number} [delay=1000] Update delay
 * @return {Array}              `[value, reset]`
 */

export default function(start, delay = 1000) {
  // Inner state
  const [value, setValue] = useState(start);
  // Start countdown
  useEffect(() => {
    // Until expired
    if (value > 0) {
      const to = setTimeout(setValue, delay, Math.max(0, value - delay / 1000));
      return () => clearTimeout(to);
    }
  }, [delay, value]);

  const reset = () => setValue(start);

  return [value, reset];
}
