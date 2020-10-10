import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";

import { Loading, PasswordField } from "./";

/**
 * [LoginDialog description]
 * @param       {[type]} [login=(] [description]
 * @constructor
 */
export default function LoginDialog({
  login = () => Promise.reject(new Error("No login function provided")),
  title = "",
  actions = [],
  BoxProps = {},
  ButtonLabel = "Login",
  ButtonProps = {},
  PasswordProps = {},
  UsernameProps = {},
  ...others
}) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    setLoading(true);
    login(username, password)
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog {...others}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box {...BoxProps}>
          <TextField
            fullWidth
            label="Username"
            onChange={({ target: { value } }) => setUsername(value)}
            {...UsernameProps}
          />
        </Box>
        <Box {...BoxProps}>
          <PasswordField
            fullWidth
            label="Password"
            onChange={({ target: { value } }) => setPassword(value)}
            {...PasswordProps}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        {actions}

        <Button disabled={loading} onClick={handleLogin} {...ButtonProps}>
          {ButtonLabel}
          <Loading loading={loading} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

LoginDialog.propTypes = {
  login: PropTypes.func,
  title: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.node),
  BoxProps: PropTypes.object,
  ButtonProps: PropTypes.object,
  PasswordProps: PropTypes.object,
  UsernameProps: PropTypes.object
};
