exports.exec = async () => {
  const path = require("path");
  const argv = require("optimist").argv;
  const fs = require("fs");

  const customConfigFilePathTs = path.join(process.cwd(), "mp-pack.config.ts");
  const customConfigFilePathJs = path.join(process.cwd(), "mp-pack.config.js");
  const configFilePath = fs.existsSync(customConfigFilePathTs)
    ? customConfigFilePathTs
    : fs.existsSync(customConfigFilePathJs)
    ? customConfigFilePathJs
    : path.join(__dirname, `../vite.config.js`);
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
  });
};
