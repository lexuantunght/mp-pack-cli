#! /usr/bin/env node

const { exec } = require("child_process");
const argv = require("optimist").argv;
const buildCmd = require("./cmd-build");
const devCmd = require("./cmd-dev");
const langCmd = require("./cmd-lang");
const iconCmd = require("./cmd-icon");
const helpCmd = require("./cmd-help");
const Logger = require("../utils/log");

let command = "build";
if (argv["_"] && argv["_"][0]) {
  command = argv["_"][0];
}

Logger.info("[WP-CLI] Run command:", command);

const doExec = (script) => {
  exec(script, (e, out, err) => {
    if (e) Logger.error(e);
    if (out) Logger.info(out);
    if (err) Logger.error(err);
  });
};

switch (command) {
  case "build":
    buildCmd.exec(doExec);
    break;
  case "dev":
    devCmd.exec(doExec);
    break;
  case "lang":
    langCmd.exec(doExec);
    break;
  case "icon":
    iconCmd.exec(doExec);
    break;
  case "help":
    helpCmd.exec();
    break;
  default:
    Logger.error("Not found command", command);
    break;
}
