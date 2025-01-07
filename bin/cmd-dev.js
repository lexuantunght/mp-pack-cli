const argv = require("optimist").argv;
const path = require("path");

const entry = argv.entry || process.env.ENTRY || "index.html";
const port = argv.port || process.env.PORT || 3000;
const packageName = "wp-cli";
const configFilePath = path.join(
  process.cwd(),
  `node_modules/${packageName}/vite.config.js`
);

exports.exec = (doExec) => {
  doExec(
    `cross-env NODE_ENV=development vite serve -c ${configFilePath} --port ${port} ${entry}`
  );
};
