exports.exec = async () => {
  const path = require("path");
  const argv = require("optimist").argv;

  const configLibFilePath = path.join(__dirname, `../vite.lib.config.js`);
  const customConfigFilePath = path.join(process.cwd(), "mp-pack.config.json");
  const customConfig = fs.existsSync(customConfigFilePath)
    ? JSON.parse(fs.readFileSync(customConfigFilePath, "utf-8"))
    : {};
  const vite = require("vite");

  const name = argv.name || "index";
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
  if (argv.excludeDeps) {
    process.env.EXCLUDE_DEPS = argv.excludeDeps;
  }

  await vite.build({
    configFile: configLibFilePath,
    mode: "production",
    build: {
      lib: {
        entry: entries,
        name: name,
        formats: ["es"],
        fileName: () => `${name}.js`,
      },
      outDir: path.resolve(process.cwd(), argv.outDir || "dist"),
      target: argv.target || "es6",
    },
    ...customConfig,
  });
};
