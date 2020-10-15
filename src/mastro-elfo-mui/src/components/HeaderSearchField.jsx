import React from "react";
import PropTypes from "prop-types";

import { fade, useTheme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import SearchField from "./SearchField";

/**
 * A `SearchField` styled to stay inside `Header`.
 * @param       {Object} [BoxProps={}] [description]
 * @param       {[type]} rest          Forwarded to `SearchField`
 * @constructor
 */
export default function HeaderSearchField({ BoxProps = {}, ...rest }) {
  const theme = useTheme();

  return (
    <Box
      bgcolor={fade(theme.palette.common.white, 0.15)}
      borderRadius={theme.shape.borderRadius}
      py={0.5}
    >
      <SearchField
        variant="standard"
        InputProps={{ disableUnderline: true }}
        {...rest}
      />
    </Box>
  );
}

HeaderSearchField.propTypes = {
  BoxProps: PropTypes.object
};
