exports.exec = async () => {
  const argv = require("optimist").argv;
  const path = require("path");
  const fs = require("fs");
  const Logger = require("../utils/log");

  const port = argv.port || process.env.PORT || 3000;
  const configFilePath = path.join(__dirname, `../vite.config.js`);
  const customConfigFilePath = path.join(process.cwd(), "mp-pack.config.json");
  const customConfig = fs.existsSync(customConfigFilePath)
    ? JSON.parse(fs.readFileSync(customConfigFilePath, "utf-8"))
    : {};

  const vite = require("vite");
  const server = await vite.createServer({
    configFile: configFilePath,
    mode: "development",
    ...customConfig,
  });
  await server.listen(port);
  Logger.info("Server started on port", port);
  server.openBrowser();
};
