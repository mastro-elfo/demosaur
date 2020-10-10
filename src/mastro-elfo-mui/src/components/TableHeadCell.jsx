/**
 *
 */

import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

/**
 * A `TableCell` with theme primary color as background and corresponding contrast color as text color.
 * @type {[type]}
 */
export default withStyles(theme => {
  return {
    // Apply head style based on theme
    head: {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: `${theme.palette.primary.contrastText} !important`,
      textAlign: "center",
      fontWeight: "bold",
      "-webkit-print-color-adjust": "exact"
    }
  };
})(TableCell);
