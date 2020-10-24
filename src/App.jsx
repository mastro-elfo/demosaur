import React from "react";

import { HashRouter } from "react-router-dom";

import primary from "@material-ui/core/colors/teal";
import secondary from "@material-ui/core/colors/teal";

import { AppContainer } from "mastro-elfo-mui";

import { route as about } from "./pages/about";
import { route as backup } from "./pages/backup";
import { route as dashboard } from "./pages/dashboard";
import { route as errorPage } from "./pages/error";
import { route as help } from "./pages/help";
import { route as settings } from "./pages/settings";
import { route as stock } from "./pages/stock";
import { route as todolist } from "./pages/todolist";

import "./storage.js";
const palette = sessionStorage.getJson("palette", {
  primary: primary,
  secondary: secondary,
  type: "light"
});

function App() {
  return (
    <AppContainer
      ThemeProps={{
        palette
      }}
      RouterProps={{
        Router: HashRouter,
        routes: [
          about,
          backup,
          dashboard,
          errorPage,
          help,
          settings,
          stock,
          todolist
        ]
      }}
    />
  );
}

export default App;
