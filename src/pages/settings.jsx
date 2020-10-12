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

import { BackIconButton, Content, Header, Page } from "../mastro-elfo-mui/";

import InvertColorsIcon from "@material-ui/icons/InvertColors";
import PaletteIcon from "@material-ui/icons/Palette";
import SettingsIcon from "@material-ui/icons/Settings";

import { usePalette, str2color } from "../usePalette";

function Component() {
  const [
    { primary, secondary, type },
    setPrimary,
    setSecondary,
    setType
  ] = usePalette();
  const [open, setOpen] = useState(false);

  const handleToggleTheme = () => setType(type === "light" ? "dark" : "light");
  const handlePickPrimary = () => setOpen("primary");
  const handlePickSecondary = () => setOpen("secondary");
  const handlePick = color => {
    if (open === "primary") setPrimary(color);
    else setSecondary(color);
    setOpen(false);
  };

  return (
    <Page
      header={<Header LeftAction={<BackIconButton />}>Settings</Header>}
      content={
        <Content>
          <List>
            <ListItem button onClick={handlePickPrimary}>
              <ListItemIcon>
                <PaletteIcon />
              </ListItemIcon>
              <ListItemText
                primary={capitalize(primary)}
                secondary="Primary color"
              />
            </ListItem>

            <ListItem button onClick={handlePickSecondary}>
              <ListItemIcon>
                <PaletteIcon />
              </ListItemIcon>
              <ListItemText
                primary={capitalize(secondary)}
                secondary="Secondary color"
              />
            </ListItem>

            <ListItem button onClick={handleToggleTheme}>
              <ListItemIcon>
                <InvertColorsIcon />
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
      <DialogTitle>Pick a color</DialogTitle>
      <DialogContent>
        <Grid container justify="space-between">
          {[
            "amber",
            "blue",
            "cyan",
            "deepOrange",
            "deepPurple",
            "green",
            "indigo",
            "lightBlue",
            "lightGreen",
            "lime",
            "orange",
            "pink",
            "purple",
            "red",
            "teal",
            "yellow"
          ].map((color, i) => (
            <Grid key={i} item xs={3}>
              <Box
                p={2}
                bgcolor={str2color(color)[type === "primary" ? 500 : "A400"]}
                color={theme.palette.getContrastText(
                  str2color(color)[type === "primary" ? 500 : "A400"]
                )}
                onClick={() => onPick(color)}
                style={{ cursor: "pointer" }}
              >
                {color}
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
