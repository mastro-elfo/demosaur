import React, { useState } from "react";
import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import { Button, Typography } from "@material-ui/core";

function Component() {
  const [state, setState] = useState();
  return (
    <Page
      header={<Header LeftAction={<BackIconButton />}>Throw an Error</Header>}
      content={
        <Content>
          <Typography paragraph>
            This page demonstrates the use of error boundaries with ReactJS.
          </Typography>
          <Typography paragraph>
            Click this button to throw an error and display the error boundary
            page. The error page will have the same style as the others.
          </Typography>
          <Typography paragraph>
            In the error page, in the top right corner there will be an icon
            button to reload the page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setState({})}
          >
            Throw
          </Button>
          {state}
        </Content>
      }
    />
  );
}

export const route = {
  path: "/error",
  exact: true,
  component: Component
};

export const drawer = {
  key: "error",
  primary: "Error",
  secondary: "",
  icon: <BrokenImageIcon />,
  title: "Open Error"
};
