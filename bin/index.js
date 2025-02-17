#! /usr/bin/env node

const { Command } = require("commander");
const program = new Command();

program.command("help").action(() => {
  require("./cmd-help").exec();
});

program
  .command("new")
  .allowUnknownOption()
  .allowExcessArguments()
  .action(() => {
    require("./cmd-new").exec();
  });

program
  .command("build")
  .allowUnknownOption()
  .allowExcessArguments()
  .action(() => {
    require("./cmd-build").exec();
  });

program
  .command("build:ssr")
  .allowUnknownOption()
  .allowExcessArguments()
  .action(() => {
    require("./cmd-build-ssr").exec();
  });

program
  .command("build:lib")
  .allowUnknownOption()
  .allowExcessArguments()
  .action(() => {
    require("./cmd-build-lib").exec();
  });

program
  .command("dev")
  .allowUnknownOption()
  .allowExcessArguments()
  .action(() => {
    require("./cmd-dev").exec();
  });

program
  .command("dev:ssr")
  .allowUnknownOption()
  .allowExcessArguments()
  .action(() => {
    require("./cmd-dev-ssr").exec();
  });

program
  .command("lang")
  .allowUnknownOption()
  .allowExcessArguments()
  .action(() => {
    require("./cmd-lang").exec();
  });

program
  .command("icon")
  .allowUnknownOption()
  .allowExcessArguments()
  .action(() => {
    require("./cmd-icon").exec();
  });

program
  .command("copy")
  .allowUnknownOption()
  .allowExcessArguments()
  .action(() => {
    require("./cmd-copy").exec();
  });

program.parse(process.argv);
