const path = require("path");
const argv = require("optimist").argv;
const packageName = "wp-cli";
const configFilePath = path.join(
  process.cwd(),
  `node_modules/${packageName}/gulpfile.js`
);

const inpDir = path.join(process.cwd(), argv.i);
const outDir = path.join(process.cwd(), argv.o);

exports.exec = (doExec) => {
  doExec(`gulp -f ${configFilePath} iconfont --i ${inpDir} --o ${outDir}`);
};
