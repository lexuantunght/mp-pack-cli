exports.exec = async () => {
  const path = require("path");
  const fs = require("fs");

  const packageName = "mp-pack-cli";
  const configFilePath = path.join(
    process.cwd(),
    `node_modules/${packageName}/vite.config.js`
  );
  const vite = require("vite");

  await vite.build({
    configFile: configFilePath,
    mode: "production",
  });
};
