import api from "../../api";
import config from "../../config";
import thinky from "../thinky";
import User from "./model";

import assert from "assert";

require('co-mocha');

const request = require('co-supertest').agent(api.listen(config.koa.port));
const r = thinky.r;

describe("User Model -- ", function() {
  let newUser = {};

  beforeEach(function *() {
    newUser = { firstName: "James", lastName: "Cole" };
    yield r.table("User").delete();
  });

  afterEach(function *() {
    yield r.table("User").delete();
  });

  it("a new user is instantiated as an object", function *() {
    let user = new User(newUser);
    assert.equal(typeof user, "object");
  });

  it("should store properties sent to it upon instantiation", function *() {
    let user = new User(newUser);
    assert.equal(user.firstName, newUser.firstName);
    assert.equal(user.lastName, newUser.lastName);
  });

  it("should create a user with properties matching the POSTed object", function *() { 
    let user = new User(newUser);
    yield request
      .post("/api/user/")
      .send(user)
      .expect(201)
      .expect("Location",  /^\/api\/user\/[a-zA-Z0-9-_]{36}$/)
      .expect(function(response) {
        assert.equal(response.body.firstName, newUser.firstName);
        assert.equal(response.body.lastName, newUser.lastName);
      })
      .end();
  });

  it("should fetch a user by id", function *() {
    let user = new User(newUser);
    let savedUser = yield user.save();
    yield request
      .get("/api/user/" + savedUser.id)
      .expect(200)
      .expect("Location",  /^\/api\/user\/[a-zA-Z0-9-_]{36}$/)
      .expect(function(response) {
        assert.equal(savedUser.firstName, response.body.firstName);                                                                     
        assert.equal(savedUser.lastName, response.body.lastName);
      })
      .end();
  });

  it("should update a user", function *() {
    let user = new User(newUser);
    let savedUser = yield user.save();
    yield request
      .put("/api/user/" + savedUser.id)
      .send({ firstName: "Tom" })
      .expect(200)
      .expect("Location",  /^\/api\/user\/[a-zA-Z0-9-_]{36}$/)
      .expect(function(response) {
        assert.equal(response.body.firstName, "Tom");
      })
      .end();
  });

  it("should delete a user", function *() {
    let user = new User(newUser);
    let savedUser = yield user.save();
      yield request
        .delete("/api/user/" + savedUser.id)
        .expect(204)
        .end();
    });
});
