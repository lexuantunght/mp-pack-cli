exports.exec = () => {
  const path = require("path");
  const argv = require("optimist").argv;
  const configFilePath = path.join(__dirname, `../scripts/lang.js`);

  const inpDir = path.join(process.cwd(), argv.i);
  const outDir = path.join(process.cwd(), argv.o);
  const { exec } = require("child_process");

  const proc = exec(`node ${configFilePath} --i ${inpDir} --o ${outDir}`, (err, o, e) => {
    if (err) console.error(err);
    if (o) console.log(o);
    if (e) console.error(e);
  });
  proc.stderr.on('data', console.error);
  proc.stdout.on('data', console.log);
};
