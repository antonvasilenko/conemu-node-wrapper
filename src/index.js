"use strict";

const childProcess = require("child_process");
const util = require("util");
const SHELLS = require("./shells");
const { ConemuCommandBuilder } = require("./conemu");
const execFile = util.promisify(require("child_process").execFile);

const isInTest = typeof global.it === "function";

const sandbox = () => {
  console.log("Hello from node");

  const ConEmuPath = '"c:/tools/ConEmu/ConEmu64.exe"';
  const shell = SHELLS.cmd;
  const path = "c:/tools";

  const builder = new ConemuCommandBuilder("c:/tools/ConEmu/ConEmu64.exe");

  const exit = shouldExit => (shouldExit ? shell.paramExit : shell.paramNoExit);

  // let execute = `-runlist ${shell.executable} ${exit(false)} npm -g outdated`;
  // execute = `-run -new_console${tabName("test")} {Shells::bash}`;

  const command = builder
    .inNewConsole()
    .withTabName("test-service:serve")
    .inDirectory("c:/tools")
    .withCommand("npm -g outdated")
    .build();

  console.log("command to execute \n", command);
  childProcess.exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });

  // const getVersion = () =>
  //   execFile("node", ["--version"])
  //     .then(({ stdout }) => {
  //       console.log(stdout);
  //       process.exit(0);
  //     })
  //     .catch(({ stdout, stderr }) => {
  //       console.log(stdout);
  //       console.error(stderr);
  //       process.exit(1);
  //     });

  // getVersion();
};

!isInTest && sandbox();
