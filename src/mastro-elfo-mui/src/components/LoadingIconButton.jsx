import React, { useState } from "react";
import PropTypes from "prop-types";

import { useSnackbar } from "notistack";

import { IconButton } from "@material-ui/core";

import { AbsoluteCircularProgress, Loading } from "./";

/**
 * [LoadingIconButton description]
 * @param       {[type]} children     [description]
 * @param       {[type]} [callback=(] [description]
 * @constructor
 */
export default function LoadingIconButton({
  children,
  callback = () => Promise.reject(new Error("No callback provided")),
  disabled = false,
  AbsoluteCircularProgressProps = {},
  ...others
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    callback()
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <IconButton
      disabled={loading || disabled}
      onClick={handleClick}
      {...others}
    >
      {children}
      <Loading loading={loading}>
        <AbsoluteCircularProgress
          color="secondary"
          {...AbsoluteCircularProgressProps}
        />
      </Loading>
    </IconButton>
  );
}

LoadingIconButton.propTypes = {
  children: PropTypes.node,
  callback: PropTypes.func,
  disabled: PropTypes.bool,
  AbsoluteCircularProgressProps: PropTypes.object
};
