exports.exec = async () => {
  const path = require("path");
  const argv = require("optimist").argv;
  const fs = require("fs");

  const configSSRFilePath = path.join(__dirname, `../vite.ssr.config.js`);
  const customConfigFilePath = path.join(
    process.cwd(),
    argv.config ? argv.config : "mp-pack.config.json"
  );
  const customConfig = fs.existsSync(customConfigFilePath)
    ? JSON.parse(fs.readFileSync(customConfigFilePath, "utf-8"))
    : {};
  const vite = require("vite");

  const entries = [];
  for (let i = 1; i < argv["_"].length; i++) {
    entries.push(path.resolve(process.cwd(), argv["_"][i]));
  }

  // env
  if (argv.platform) {
    process.env.PLATFORM = argv.platform;
  }
  if (argv.mode) {
    process.env.NODE_ENV = argv.mode;
  }
  if (argv.flags) {
    process.env.FLAGS = argv.flags;
  }

  await vite.build({
    configFile: configSSRFilePath,
    mode: "production",
    build: {
      lib: {
        entry: entries,
        formats: argv.format ? argv.format.split(",") : ["cjs"],
      },
      outDir: path.resolve(process.cwd(), argv.outDir || "build"),
      target: argv.target || "es6",
    },
    ...customConfig,
  });
};
