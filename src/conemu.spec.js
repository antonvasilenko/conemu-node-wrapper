const { expect } = require("chai");
const { ConemuCommandBuilder } = require("./conemu");

describe("ConemuCommandBuilder", () => {
  describe("ctor", () => {
    it("should fail without path", () => {
      expect(() => new ConemuCommandBuilder()).to.throw(Error);
    });
  });
});
