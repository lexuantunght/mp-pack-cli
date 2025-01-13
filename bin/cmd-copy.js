exports.exec = async () => {
  const argv = require("optimist").argv;
  const ncp = require("ncp");
  const Logger = require("../utils/log");

  const source = argv["_"][1];
  const destination = argv["_"][2];
  ncp(source, destination, (err) => {
    if (err) {
      Logger.error(err);
    } else {
      Logger.info("success copy", source, "to", destination);
    }
  });
};
