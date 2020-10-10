import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import { IconButton } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

import { Drawer } from "./";

/**
 * [DrawerIconButton description]
 * @param       {[type]} children             [description]
 * @param       {Object} [IconButtonProps={}] [description]
 * @param       {Object} [DrawerProps={}}]    [description]
 * @constructor
 */
export default function DrawerIconButton({
  children,
  IconButtonProps = {},
  DrawerProps = {}
}) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <IconButton
        color="inherit"
        onClick={() => setOpen(true)}
        {...IconButtonProps}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        {...DrawerProps}
      >
        {children}
      </Drawer>
    </Fragment>
  );
}

DrawerIconButton.propTypes = {
  children: PropTypes.node,
  IconButtonProps: PropTypes.object,
  DrawerProps: PropTypes.object
};
