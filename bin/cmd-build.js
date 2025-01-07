const argv = require("optimist").argv;
const path = require("path");

const entry = argv.entry || process.env.ENTRY || "index.html";
const packageName = "wp-cli";
const configFilePath = path.join(
  process.cwd(),
  `node_modules/${packageName}/vite.config.js`
);

exports.exec = (doExec) => {
  doExec(
    `cross-env NODE_ENV=production vite build -c ${configFilePath} ${entry}`
  );
};
