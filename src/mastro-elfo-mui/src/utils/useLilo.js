import { useState } from "react";

/**
 * Creates a LastInLastOut list of length `length`
 * @param  {Array}  [start=[]] List initialization
 * @param  {Number} [length=1] Length of the list
 * @return {Array}             [list, push, pop]
 */

export default function useLilo(start = [], length = 1) {
  if (length === 0) {
    console.warn("A list with length 0 is always empty");
  }
  // Setup
  const [lilo, setLilo] = useState(slice(start, length));
  // Push method
  const push = item => {
    // Append, slice and set
    setLilo(slice([...lilo, item], length));
  };
  // Pop
  const pop = () => {
    // Extract
    const [item, ...rest] = lilo;
    // Set
    setLilo(rest);
    // Return
    return item;
  };
  // Return lilo list, push method, and pop
  return [lilo, push, pop];
}

// Slice list to length
function slice(list, length) {
  // If length is undefined don't slice
  if (length !== undefined) return list.slice(-length);
  return list;
}
