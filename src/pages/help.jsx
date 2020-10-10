import React from "react";
import { BackIconButton, Content, Header, Page } from "../mastro-elfo-mui/";
import HelpIcon from "@material-ui/icons/Help";

function Component() {
  return (
    <Page
      header={<Header LeftAction={<BackIconButton />}>Help</Header>}
      content={<Content>help</Content>}
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
