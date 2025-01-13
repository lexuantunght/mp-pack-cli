exports.exec = async () => {
  const argv = require("optimist").argv;
  const { exec } = require("child_process");

  exec(`npx ts-node-dev ${argv["_"][1]}`, (err, o, e) => {
    if (err) console.error(err);
    if (o) console.log(o);
    if (e) console.error(e);
  });
};
