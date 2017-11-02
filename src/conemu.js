class ConemuCommandBuilder {
  constructor(path) {
    if (!path) {
      throw new Error("path to conemu should be specified as first argument");
    }
    this.conemuPath = `"${path}"`;
    this.runMode = "-run";
    this.newConsole = false;
    this.tabName = null;
    this.workDir = null;
    this.shellName = null;
    this.command = `echo hello world`;
  }

  runList() {
    this.runMode = "-runlist";
    return this;
  }

  inNewConsole() {
    this.newConsole = true;
    return this;
  }

  inDirectory(workDir) {
    this.workDir = workDir;
    return this;
  }

  withTabName(tabName) {
    this.tabName = tabName;
    return this;
  }

  withShell(shellName) {
    this.shellName = `{${shellName}}`;
    return this;
  }

  withCommand(command) {
    this.command = command;
    return this;
  }

  build() {
    let execute = `${this.conemuPath} `;
    execute += this.runMode;
    if (this.inNewConsole) {
      execute += " -new_console";
    }
    if (this.tabName) {
      execute += `:t:"${this.tabName}"`;
    }
    if (this.workDir) {
      execute += `:d:${this.workDir}`;
    }
    if (this.shellName) {
      execute += ` ${this.shellName}`;
    }
    if (this.command) {
      execute += ` ${this.command}`;
    }

    return execute;
  }
}

module.exports = {
  ConemuCommandBuilder
};
