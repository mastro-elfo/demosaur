/**
 * Evaluate `value` if it's a function, otherwise returns `value`
 * @param  {any} value Function or any type
 * @param  {any} props if `value` is a function, all the following arguments are passed to it.
 * @return {any}       Same as `value` or `value(...props)`
 */

export default function evaluate(value, ...props) {
  if (typeof value === "function") return value(...props);
  return value;
}
