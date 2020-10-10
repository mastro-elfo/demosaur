import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import { Button, IconButton } from "@material-ui/core";

import ConfirmDialog from "./ConfirmDialog";

/**
 * Creates a `Button`  or an `IconButton` that opens a `ConfirmDialog`.
 * @param       {[type]}  children       [description]
 * @param       {Boolean} [isIcon=false] [description]
 * @param       {[type]}  [onConfirm=(]  [description]
 * @constructor
 */
export default function ConfirmDialogButton({
  children,
  isIcon = false,
  onConfirm = () => {},
  DialogProps = {},
  ...others
}) {
  const [open, setOpen] = useState(false);

  // Use Button or IconButton
  const Component = isIcon ? IconButton : Button;

  const handleConfirm = () => {
    setOpen(false);
    onConfirm();
  };

  return (
    <Fragment>
      <Component color="inherit" onClick={() => setOpen(true)} {...others}>
        {children}
      </Component>
      <ConfirmDialog
        {...DialogProps}
        open={open}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
}

ConfirmDialogButton.propTypes = {
  children: PropTypes.node.isRequired,
  isIcon: PropTypes.bool,
  onConfirm: PropTypes.func,
  ButtonProps: PropTypes.object,
  DialogProps: PropTypes.object
};
