const { expect } = require("chai");
const { ConemuCommandBuilder } = require("./conemu");

describe("ConemuCommandBuilder", () => {
  it("should fail without path without path to conemu", () => {
    expect(() => new ConemuCommandBuilder()).to.throw(Error);
  });

  describe("with correct path", () => {
    it("should build correct command with all specified params", () => {
      const command = new ConemuCommandBuilder("c:/tools/conemu.exe")
        .inNewConsole()
        .withTabName("tab name")
        .inDirectory("c:/tools")
        .withCommand("npm -g outdated")
        .build();
      expect(command).to.be.equal(
        '"c:/tools/conemu.exe" -run -new_console:t:"tab name":d:c:/tools npm -g outdated'
      );
    });
  });
});
