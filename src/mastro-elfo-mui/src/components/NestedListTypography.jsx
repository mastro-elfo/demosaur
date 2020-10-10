import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";

/**
 * Use Typography to create nested lists.
 *
 * Example
 *
 * ```jsx
 * <NestedListTypography>{["Item 1", ["Sublist Item 1", "Sublist Item 2"], "Item 2"]}</NestedListTypography>
 *
 * * Item 1
 *  - Sublist item 1
 *  - Sublist Item 2
 * * Item 2
 * ```
 * @param       {Array} children   Array of strings or nested array
 * @param       {Object} [ulProps={ component: "ul" }] Properties for Typography component for lists
 * @param       {Object} [liProps={ component: "li" }] Properties for Typography component for list items
 * @constructor
 */

export default function NestedListTypography({
  children,
  ulProps = { component: "ul" },
  liProps = { component: "li" }
}) {
  if (typeof children === "object") {
    // Assumes array
    return (
      <Typography {...ulProps}>
        {children.map((child, i) => (
          <NestedListTypography key={i}>{child}</NestedListTypography>
        ))}
      </Typography>
    );
  } else if (children !== null && children !== undefined) {
    return <Typography {...liProps}>{children}</Typography>;
  }
  return null;
}

NestedListTypography.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  liProps: PropTypes.object,
  ulProps: PropTypes.object
};
