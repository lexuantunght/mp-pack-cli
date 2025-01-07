exports.exec = () => {
  const path = require("path");
  const argv = require("optimist").argv;
  const packageName = "mp-pack-cli";
  const configFilePath = path.join(
    process.cwd(),
    `node_modules/${packageName}/scripts/lang.js`
  );

  const inpDir = path.join(process.cwd(), argv.i);
  const outDir = path.join(process.cwd(), argv.o);
  const { exec } = require("child_process");

  exec(`node ${configFilePath} --i ${inpDir} --o ${outDir}`, (err, o, e) => {
    if (err) console.error(err);
    if (o) console.log(o);
    if (e) console.error(e);
  });
};
