const package = require("../package.json");
const fs = require("fs");

// Output version to 'src/version.js'
fs.writeFileSync(
  "./src/version.js",
  `export const version = "${package.version}";`
);
