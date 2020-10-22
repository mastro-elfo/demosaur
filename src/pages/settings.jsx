import React, { useState } from "react";

import { capitalize } from "lodash";

import { useTheme } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid
} from "@material-ui/core";

import {
  BackIconButton,
  Content,
  Header,
  Page,
  usePalette
} from "mastro-elfo-mui";

import DarkIcon from "@material-ui/icons/Brightness4";
import GradeIcon from "@material-ui/icons/Grade";
import LightIcon from "@material-ui/icons/Brightness7";
import PaletteIcon from "@material-ui/icons/Palette";
import SettingsIcon from "@material-ui/icons/Settings";

import amber from "@material-ui/core/colors/amber";
import blue from "@material-ui/core/colors/blue";
import cyan from "@material-ui/core/colors/cyan";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import green from "@material-ui/core/colors/green";
import indigo from "@material-ui/core/colors/indigo";
import lightBlue from "@material-ui/core/colors/lightBlue";
import lightGreen from "@material-ui/core/colors/lightGreen";
import lime from "@material-ui/core/colors/lime";
import orange from "@material-ui/core/colors/orange";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";
import teal from "@material-ui/core/colors/teal";
import yellow from "@material-ui/core/colors/yellow";

function Component() {
  const [palette, setPalette] = usePalette();
  const [open, setOpen] = useState(false);

  const { primary, secondary, type } = palette;

  const handleToggleTheme = () =>
    setPalette({ ...palette, type: type === "light" ? "dark" : "light" });

  const handlePickPrimary = () => setOpen("primary");
  const handlePickSecondary = () => setOpen("secondary");

  const handlePick = color => {
    if (open === "primary") setPalette({ ...palette, primary: color });
    else setPalette({ ...palette, secondary: color });
    setOpen(false);
  };

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton />}
          RightActions={<GradeIcon key="secondary" color="secondary" />}
        >
          Settings
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem button onClick={handlePickPrimary}>
              <ListItemIcon>
                <PaletteIcon
                  style={{ stroke: primary[500], fill: primary[500] }}
                />
              </ListItemIcon>
              <ListItemText
                primary={colorName(primary)}
                secondary="Primary color"
              />
            </ListItem>

            <ListItem button onClick={handlePickSecondary}>
              <ListItemIcon>
                <PaletteIcon
                  style={{ stroke: secondary["A400"], fill: secondary["A400"] }}
                />
              </ListItemIcon>
              <ListItemText
                primary={colorName(secondary)}
                secondary="Secondary color"
              />
            </ListItem>

            <ListItem button onClick={handleToggleTheme}>
              <ListItemIcon>
                {type === "light" ? <DarkIcon /> : <LightIcon />}
              </ListItemIcon>
              <ListItemText primary={capitalize(type)} secondary="Theme" />
            </ListItem>
          </List>

          <ColorDialog
            open={!!open}
            type={open}
            onPick={handlePick}
            onClose={() => {
              setOpen(false);
            }}
          />
        </Content>
      }
    />
  );
}

export const route = {
  path: "/settings",
  exact: true,
  component: Component
};

export const drawer = {
  key: "settings",
  primary: "Settings",
  secondary: "",
  icon: <SettingsIcon />,
  title: "App settings"
};

function ColorDialog({ onPick, type, ...rest }) {
  const theme = useTheme();

  return (
    <Dialog {...rest}>
      <DialogTitle>Pick a {type} color</DialogTitle>
      <DialogContent>
        <Grid container justify="space-between">
          {[
            amber,
            blue,
            cyan,
            deepOrange,
            deepPurple,
            green,
            indigo,
            lightBlue,
            lightGreen,
            lime,
            orange,
            pink,
            purple,
            red,
            teal,
            yellow
          ].map((color, i) => (
            <Grid key={i} item xs={3}>
              <Box
                p={2}
                bgcolor={color[type === "primary" ? 500 : "A400"]}
                color={theme.palette.getContrastText(
                  color[type === "primary" ? 500 : "A400"]
                )}
                onClick={() => onPick(color)}
                style={{ cursor: "pointer" }}
              >
                {colorName(color)}
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

function colorName(color) {
  return {
    [amber[500]]: "Amber",
    [blue[500]]: "Blue",
    [cyan[500]]: "Cyan",
    [deepOrange[500]]: "DeepOrange",
    [deepPurple[500]]: "DeepPurple",
    [green[500]]: "Green",
    [indigo[500]]: "Indigo",
    [lightBlue[500]]: "LightBlue",
    [lightGreen[500]]: "LightGreen",
    [lime[500]]: "Lime",
    [orange[500]]: "Orange",
    [pink[500]]: "Pink",
    [purple[500]]: "Purple",
    [red[500]]: "Red",
    [teal[500]]: "Teal",
    [yellow[500]]: "Yellow"
  }[color[500]];
}
