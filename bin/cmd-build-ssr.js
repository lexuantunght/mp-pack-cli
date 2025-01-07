exports.exec = async () => {
  const path = require("path");
  const argv = require("optimist").argv;

  const configSSRFilePath = path.join(__dirname, `../vite.ssr.config.js`);
  const vite = require("vite");

  await vite.build({
    configFile: configSSRFilePath,
    mode: "production",
    build: {
      lib: {
        entry: path.resolve(process.cwd(), argv.entry || argv["_"][1]),
        name: argv.name,
        formats: ["cjs", "es"],
      },
    },
  });
};
