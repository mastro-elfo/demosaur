import { deburr } from "lodash";

/**
 * Clean a string with options.
 *
 * Options:
 *
 * - `lower` convert to lower case
 * - `trim` trims
 * - `deburr` deburr
 * - `replace_symbol` if not `false` must be a string with which each symbol is replaced
 * - `compact_spaces` compacts multiple spaces
 *
 * @param  {string} input          Input string
 * @param  {Object} options={
 *  lower: false,
 *  trim: false,
 *  deburr: false,
 *  replace_symbol: false,
 *  compact_spaces: false
 * }
 * @return {string}                Clean string
 */

export default function clean(
  input,
  options = {
    lower: false,
    trim: false,
    deburr: false,
    replace_symbol: false,
    compact_spaces: false
  }
) {
  let output = input;
  // console.log("Before clean", output, options);
  if (options.lower) output = output.toLowerCase();
  // console.log("After lower", output);
  if (options.trim) output = output.trim();
  // console.log("After trim", output);
  if (options.deburr) output = deburr(output);
  // console.log("After deburr", output);
  if (options.replace_symbol || options.replace_symbol === "")
    output = output.replace(/\W/g, options.replace_symbol);
  // console.log("After replace_symbol", output);
  if (options.compact_spaces) output = output.replace(/\s+/g, " ");
  // console.log("After compact_spaces", output);
  return output;
}
