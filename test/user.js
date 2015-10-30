import api from "../api";
import config from "../config";
import thinky from "../api/thinky";
import User from "../api/user/model";

import assert from "assert";

require('co-mocha');

const request = require('co-supertest').agent(api.listen(config.koa.port));
const r = thinky.r;

describe("User Model -- ", function() {
  let newUser;

  before(function *() {
    // make sure table exists
    let tableList = yield r.tableList();
    if (!tableList.includes("User")) {
      yield r.tableCreate("User").run();
    }

    // setup user for testing
    newUser = new User({ firstName: "James", lastName: "Cole" });
  });

  beforeEach(function *() {
    yield r.table("User").delete().run();
  });

  afterEach(function *() {
    yield r.table("User").delete().run();
  });

  it("a new user is instantiated as an object", function *(done) {
    assert.equal(typeof newUser, "object");
    done();
  });

  it("should store properties sent to it upon instantiation", function *(done) {
    assert.equal("James", newUser.firstName);
    assert.equal("Cole", newUser.lastName);
    done();
  });

  it("should create a user with properties matching the POSTed object", function *(done) { 
    yield request
      .post("/api/user/")
      .send(newUser)
      .expect(201)
      .expect("Location",  /^\/api\/user\/[a-zA-Z0-9-_]{36}$/)
      .expect(function(response) {
        assert.equal(response.body.firstName, newUser.firstName);
        assert.equal(response.body.lastName, newUser.lastName);
      })
      .end();
    done();
  });

  it("should fetch a user by id", function *(done) {
    let savedUser = yield newUser.save();
    yield request
      .get("/api/user/" + savedUser.id)
      .expect(200)
      .expect("Location",  /^\/api\/user\/[a-zA-Z0-9-_]{36}$/)
      .expect(function(response) {
        assert.equal(savedUser.firstName, response.body.firstName);                                                                     
        assert.equal(savedUser.lastName, response.body.lastName);
      })
      .end();
    done();
  });

  it("should update a user", function *(done) {
    let savedUser = yield newUser.save();
    yield request
      .put("/api/user/" + savedUser.id)
      .send({ firstName: "Tom" })
      .expect(200)
      .expect("Location",  /^\/api\/user\/[a-zA-Z0-9-_]{36}$/)
      .expect(function(response) {
        assert.equal(response.body.firstName, "Tom");
      })
      .end();
    done();
  });

  it("should delete a user", function *(done) {
    let savedUser = yield newUser.save();  
    yield request  
      .delete("/api/user/" + savedUser.id)
      .expect(204)
      .end();
    done();
  });
});
