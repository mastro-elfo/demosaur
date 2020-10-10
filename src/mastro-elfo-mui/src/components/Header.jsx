/**
 * Create an AppBar/Toolbar header.
 *
 * Children are rendered inside a flexGrow Typography
 */

import React, { Fragment } from "react";

import { AppBar, Toolbar } from "@material-ui/core";

import GrowTypography from "./GrowTypography";

/**
 * Create an AppBar/Toolbar header.
 *
 * Children are rendered inside a flexGrow Typography
 * @param       {[type]} children          [description]
 * @param       {[type]} [LeftAction=null] [description]
 * @param       {Array}  [RightActions=[]] [description]
 * @param       {Object} [TitleProps={}}]  [description]
 * @constructor
 */
export default function Header({
  children,
  LeftAction = null,
  RightActions = [],
  TitleProps = {}
}) {
  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          {LeftAction}
          <GrowTypography variant="h6" color="inherit" {...TitleProps}>
            {children}
          </GrowTypography>
          {RightActions}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
}
