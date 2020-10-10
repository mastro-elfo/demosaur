/**
 * Creates an array with unique values.
 * @param  {Array}  [array=[]] Input array
 * @return {Array}            Array with unique values
 */

export default function unique(array = []) {
  return [...new Set(array || [])];
}
