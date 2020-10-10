import React from "react";

import { useSnackbar } from "notistack";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { BackIconButton, Content, Header, Page } from "../mastro-elfo-mui/";

import BackupIcon from "@material-ui/icons/Backup";
import SaveBackupIcon from "@material-ui/icons/CloudDownload";
import RestoreBackupIcon from "@material-ui/icons/Restore";

function Component() {
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = () => {
    new Promise(res => {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        localStorage.setItem(key, sessionStorage.getItem(key));
      }
      res();
    })
      .then(() => {
        enqueueSnackbar("Backup saved to Local Storage", {
          variant: "success"
        });
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const handleRestore = () => {
    new Promise(res => {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        sessionStorage.setItem(key, localStorage.getItem(key));
      }
      res();
    })
      .then(() => {
        enqueueSnackbar("Backup restored from Local Storage", {
          variant: "success"
        });
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  return (
    <Page
      header={<Header LeftAction={<BackIconButton />}>Backup</Header>}
      content={
        <Content>
          <List>
            <ListItem button onClick={handleSave}>
              <ListItemIcon>
                <SaveBackupIcon />
              </ListItemIcon>
              <ListItemText
                primary="Save backup"
                secondary="Save data to Local Storage"
              />
            </ListItem>

            <ListItem button onClick={handleRestore}>
              <ListItemIcon>
                <RestoreBackupIcon />
              </ListItemIcon>
              <ListItemText
                primary="Restore backup"
                secondary="Restore data from Local Storage"
              />
            </ListItem>
          </List>
        </Content>
      }
    />
  );
}

export const route = {
  path: "/backup",
  exact: true,
  component: Component
};

export const drawer = {
  key: "backup",
  primary: "Backup",
  secondary: "",
  icon: <BackupIcon />,
  title: "Manage backups"
};
