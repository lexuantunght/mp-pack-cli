exports.exec = async () => {
  const argv = require("optimist").argv;
  const path = require("path");
  const fs = require("fs");
  const Logger = require("../utils/log");

  const port = argv.port || process.env.PORT || 3000;
  const customConfigFilePathTs = path.join(process.cwd(), "mp-pack.config.ts");
  const customConfigFilePathJs = path.join(process.cwd(), "mp-pack.config.js");
  const configFilePath = fs.existsSync(customConfigFilePathTs)
    ? customConfigFilePathTs
    : fs.existsSync(customConfigFilePathJs)
    ? customConfigFilePathJs
    : path.join(__dirname, `../vite.config.js`);

  const vite = require("vite");
  const server = await vite.createServer({
    configFile: configFilePath,
    mode: "development",
  });
  await server.listen(port);
  Logger.info("Server started on port", port);
  server.openBrowser();
};
