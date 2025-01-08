exports.exec = async () => {
  const path = require("path");
  const argv = require("optimist").argv;

  const configFilePath = path.join(__dirname, `../vite.config.js`);
  const vite = require("vite");

  // env
  if (argv.platform) {
    process.env.PLATFORM = argv.platform;
  }
  if (argv.mode) {
    process.env.NODE_ENV = argv.mode;
  }

  await vite.build({
    configFile: configFilePath,
    mode: "production",
  });
};
