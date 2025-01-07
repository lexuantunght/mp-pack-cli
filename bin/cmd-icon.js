exports.exec = () => {
  const path = require("path");
  const argv = require("optimist").argv;
  const configFilePath = path.join(__dirname, `../scripts/icon.js`);

  const inpDir = path.join(process.cwd(), argv.i);
  const outDir = path.join(process.cwd(), argv.o);
  const templateDir = path.join(__dirname, `../template/icon.css`);

  const { exec } = require("child_process");

  exec(
    `node ${configFilePath} --i ${inpDir} --o ${outDir} --t ${templateDir}`,
    (err, o, e) => {
      if (err) console.error(err);
      if (o) console.log(o);
      if (e) console.error(e);
    }
  );
};
