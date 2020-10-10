import React from "react";

import { useHistory } from "react-router-dom";

import {
  Content,
  DrawerIconButton,
  DrawerLists,
  Header,
  Page
} from "../mastro-elfo-mui/";

// import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import GitHubIcon from "@material-ui/icons/GitHub";

import { drawer as about } from "./about";
import { drawer as backup } from "./backup";
import { drawer as help } from "./help";
import { drawer as settings } from "./settings";
import { drawer as todolist } from "./todolist";

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
                    items: [{ onClick: () => push("/todolist"), ...todolist }]
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
      content={<Content>Hello!</Content>}
    />
  );
}

export const route = {
  path: "/",
  exact: true,
  component: Component
};
