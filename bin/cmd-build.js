exports.exec = async () => {
  const path = require("path");
  const argv = require("optimist").argv;
  const fs = require("fs");

  const configFilePath = path.join(__dirname, `../vite.config.js`);
  const customConfigFilePath = path.join(process.cwd(), "mp-pack.config.json");
  const customConfig = fs.existsSync(customConfigFilePath)
    ? JSON.parse(fs.readFileSync(customConfigFilePath, "utf-8"))
    : {};
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
    build: {
      outDir: path.resolve(process.cwd(), argv.outDir || "build"),
    },
    ...customConfig,
  });
};
