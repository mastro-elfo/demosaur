import React, { useState } from "react";

import { HashRouter } from "react-router-dom";

import { AppContainer } from "./mastro-elfo-mui/";

import { route as about } from "./pages/about";
import { route as backup } from "./pages/backup";
import { route as dashboard } from "./pages/dashboard";
import { route as help } from "./pages/help";
import { route as settings } from "./pages/settings";
import { route as todolist } from "./pages/todolist";

import { PaletteContext, str2color } from "./usePalette";
import "./mastro-elfo-mui/src/utils/storage.js";

function App() {
  const [palette, setPalette] = useState({
    primary: "teal",
    secondary: "teal",
    type: "light"
  });
  const { primary, secondary, type } = palette;
  const setPrimary = color => setPalette({ ...palette, primary: color });
  const setSecondary = color => setPalette({ ...palette, secondary: color });
  const setType = type => setPalette({ ...palette, type });

  return (
    <PaletteContext.Provider
      value={[palette, setPrimary, setSecondary, setType]}
    >
      <AppContainer
        ThemeProps={{
          palette: {
            primary: str2color(primary),
            secondary: str2color(secondary),
            type: type
          }
        }}
        RouterProps={{
          Router: HashRouter,
          routes: [about, backup, dashboard, help, settings, todolist]
        }}
      />
    </PaletteContext.Provider>
  );
}

export default App;
