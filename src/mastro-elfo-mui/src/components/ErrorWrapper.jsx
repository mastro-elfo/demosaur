import React, { Component, Fragment } from "react";

import { IconButton, Typography } from "@material-ui/core";

import RefreshIcon from "@material-ui/icons/Refresh";

import { Content, Header } from "./";

/**
 * Error handler component
 */
export default class ErrorWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleReloadClick.bind(this);
  }

  componentDidCatch(error, info) {
    console.error("Console Error", error, info, this.props);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  handleReloadClick() {
    window.location.reload();
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <Fragment>
          <Header
            RightActions={[
              <IconButton
                key="reload"
                color="inherit"
                title="Reload"
                onClick={this.handleReloadClick}
              >
                <RefreshIcon />
              </IconButton>
            ]}
          >
            An error occurred
          </Header>
          <Content>
            <Typography variant="h3" gutterBottom>
              {error.message}
            </Typography>
            <Typography component="ul">
              {error.stack.split("\n").map((line, i) => (
                <Typography key={i} component="li" variant="body2" gutterBottom>
                  {line}
                </Typography>
              ))}
            </Typography>
          </Content>
        </Fragment>
      );
    }
    return this.props.children;
  }
}
