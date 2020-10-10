import React from "react";
import { Typography } from "@material-ui/core";
import { BackIconButton, Content, Header, Page } from "../mastro-elfo-mui/";
import HelpIcon from "@material-ui/icons/Help";

function Component() {
  return (
    <Page
      header={<Header LeftAction={<BackIconButton />}>Help</Header>}
      content={
        <Content>
          <Typography variant="h6">
            The app forgets the colors I choosed
          </Typography>
          <Typography color="textSecondary" paragraph>
            This is only a demo app, and the color picker is only for
            demostration purpose.
          </Typography>
        </Content>
      }
    />
  );
}

export const route = {
  path: "/help",
  exact: true,
  component: Component
};

export const drawer = {
  key: "help",
  primary: "Help",
  secondary: "",
  icon: <HelpIcon />,
  title: "How to"
};
