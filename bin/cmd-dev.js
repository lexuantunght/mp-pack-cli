exports.exec = async () => {
  const argv = require("optimist").argv;
  const path = require("path");
  const Logger = require("../utils/log");

  const port = argv.port || process.env.PORT || 3000;
  const packageName = "mp-pack-cli";
  const configFilePath = path.join(
    process.cwd(),
    `node_modules/${packageName}/vite.config.js`
  );

  const vite = require("vite");
  const server = await vite.createServer({
    configFile: configFilePath,
    mode: "development",
  });
  await server.listen(port);
  Logger.info("Server started on port", port);
  server.openBrowser();
};
