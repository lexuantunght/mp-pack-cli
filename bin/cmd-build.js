exports.exec = async () => {
  const path = require("path");

  const configFilePath = path.join(__dirname, `../vite.config.js`);
  const vite = require("vite");

  await vite.build({
    configFile: configFilePath,
    mode: "production",
  });
};
