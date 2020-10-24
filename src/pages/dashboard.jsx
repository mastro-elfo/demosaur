import React from "react";

import { useHistory } from "react-router-dom";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  // CardContent,
  CardMedia,
  Grid
} from "@material-ui/core";

import {
  Content,
  DrawerIconButton,
  DrawerLists,
  Header,
  Page
} from "mastro-elfo-mui";

// import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import GitHubIcon from "@material-ui/icons/GitHub";

import { drawer as about } from "./about";
import { drawer as backup } from "./backup";
import { drawer as errorDash } from "./error";
import { drawer as help } from "./help";
import { drawer as settings } from "./settings";
import { drawer as todolist } from "./todolist";
import { drawer as stock } from "./stock";

function Component() {
  const { push } = useHistory();

  return (
    <Page
      header={
        <Header
          LeftAction={
            <DrawerIconButton>
              <DrawerLists
                lists={[
                  {
                    key: "pages",
                    header: "Pages",
                    leftFill: true,
                    items: [
                      { onClick: () => push("/todolist"), ...todolist },
                      {
                        onClick: () => push("/stock"),
                        ...stock
                      },
                      { onClick: () => push("/error"), ...errorDash }
                    ]
                  },
                  {
                    key: "actions",
                    header: "Actions",
                    leftFill: true,
                    items: [
                      { onClick: () => push("/backup"), ...backup },
                      { onClick: () => push("/settings"), ...settings }
                    ]
                  },
                  {
                    key: "application",
                    header: "Application",
                    leftFill: true,
                    items: [
                      {
                        onClick: () => push("/about"),
                        ...about
                      },
                      { onClick: () => push("/help"), ...help },
                      {
                        key: "github",
                        primary: "@mastro-elfo/demosaur",
                        secondary: "Github",
                        icon: <GitHubIcon />,
                        onClick: () =>
                          window.open("https://github.com/mastro-elfo/demosaur")
                      }
                    ]
                  }
                ]}
              />
            </DrawerIconButton>
          }
        >
          Dashboard
        </Header>
      }
      content={
        <Content>
          <Grid container justify="space-evenly">
            <AppGridCard
              href="/todolist"
              title="ToDo List"
              subheader="An example of todo list app"
              image={`${process.env.PUBLIC_URL}/static/todolist.png`}
            />

            <AppGridCard
              href="/stock"
              title="Stock Products"
              subheader="An example of app that collects items"
              image={`${process.env.PUBLIC_URL}/static/stock.png`}
            />
          </Grid>
        </Content>
      }
    />
  );
}

export const route = {
  path: "/",
  exact: true,
  component: Component
};

function AppGridCard({ href, title, subheader, image }) {
  const { push } = useHistory();
  return (
    <Grid item>
      <Card>
        <CardActionArea onClick={() => push(href)}>
          <CardHeader title={title} subheader={subheader} />
          <CardMedia image={image} style={{ paddingTop: "56.25%" }} />
        </CardActionArea>
        <CardActions>
          <Button color="primary" size="small" onClick={() => push(href)}>
            Open
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
