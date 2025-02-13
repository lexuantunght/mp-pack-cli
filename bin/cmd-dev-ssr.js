exports.exec = async () => {
  const argv = require("optimist").argv;
  const { exec } = require("child_process");

  const proc = exec(`npx ts-node --esm ${argv["_"][1]}`, (err, o, e) => {
    if (err) console.error(err);
    if (o) console.log(o);
    if (e) console.error(e);
  });
  proc.stderr.on('data', console.error);
  proc.stdout.on('data', console.log);
};
