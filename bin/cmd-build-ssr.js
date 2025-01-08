exports.exec = async () => {
  const path = require("path");
  const argv = require("optimist").argv;

  const configSSRFilePath = path.join(__dirname, `../vite.ssr.config.js`);
  const vite = require("vite");

  const entries = [];
  for (let i = 1; i < argv["_"].length; i++) {
    entries.push(path.resolve(process.cwd(), argv["_"][i]));
  }

  await vite.build({
    configFile: configSSRFilePath,
    mode: "production",
    build: {
      lib: {
        entry: entries,
        formats: argv.format ? argv.format.split(",") : ["cjs"],
      },
    },
  });
};
