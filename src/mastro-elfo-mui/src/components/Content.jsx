import React from "react";

import { Box, Container } from "@material-ui/core";

/**
 * Puts a `Box` inside a `Container`.
 * @param       {[type]} children            [description]
 * @param       {Object} [ContainerProps={}] [description]
 * @param       {Object} [BoxProps={}}]      [description]
 * @constructor
 */

export default function Content({
  children,
  ContainerProps = {},
  BoxProps = {}
}) {
  return (
    <Container {...ContainerProps}>
      <Box pt={1} {...BoxProps}>
        {children}
      </Box>
    </Container>
  );
}
