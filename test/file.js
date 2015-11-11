"use strict";

require('co-mocha');

const api = require("../api");
const config = require("../config");
const Models = require("../api/models");
const assert = require("assert");
const request = require('co-supertest').agent(api.listen(3020));

describe("File Model -- ", function () {
  this.timeout(10000);
  let newFile;

  before(function *(done) {
    yield Models.models.File.ready();
    done();
  });

  beforeEach(function *(done) {
    newFile = new Models.models.File({ name: "testfile.jpg" });
    yield Models.r.table("File").delete();
    done();
  });

  afterEach(function *(done) {
    yield Models.r.table("File").delete();
    done();
  });

  it("a new file is instantiated as an object", function *(done) {
    assert.equal(typeof newFile, "object");
    done();
  });

  it("should store properties sent to it upon instantiation", function *(done) {
    assert.equal("testfile.jpg", newFile.name);
    done();
  });
});
