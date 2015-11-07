"use strict";

require('co-mocha'); 

const _           = require("lodash");
const api         = require("../api");
const config      = require("../config");
const thinky      = require("../api/thinky");
const Post        = require("../api/post/model");
const assert      = require("assert");
const request     = require('co-supertest').agent(api.listen(3010));
const r           = thinky.r;

describe("Post Model -- ", function() {
  let newPost = {};

  before(function *(done) {
    r.tableCreate("Post").then(function() {
      let dummy = new Post({ title: "Dummy" });
      done();
    });
  });

  after(function *(done) {
    r.tableDrop("Post").then(function() {
      done();
    });
  });

  beforeEach(function *(done) {
    newPost = { title: "A New Post" };
    r.table("Post").delete().then(function() {
      done();
    });
  });

  afterEach(function *(done) {
    r.table("Post").delete().then(function() {
      done();
    });
  });

  it("a new post is instantiated as an object", function *(done) {
    assert.equal(typeof newPost, "object");
    done();
  });

  it("should store properties sent to it upon instantiation", function *(done) {
    newPost = new Post({ title: "A New Post" });
    assert.equal(newPost.title, "A New Post");
    done();
  });

  it("should create a post with properties matching the POSTed object", function *(done) { 
    yield request
      .post("/api/post/")
      .send(newPost)
      .expect(201)
      .expect("Location",  /^\/api\/post\/[a-zA-Z0-9-_]{36}$/)
      .expect(function(response) {
        assert.equal(response.body.title, newPost.title);
      })
      .end();
    done();
  });

  it("should fetch a post by id", function *(done) {
    newPost = new Post({ title: "A New Post" });
    let savedPost = yield newPost.save();
    yield request
      .get("/api/post/" + savedPost.id)
      .expect(200)
      .expect("Location",  /^\/api\/post\/[a-zA-Z0-9-_]{36}$/)
      .expect(function(response) {
        assert.equal(savedPost.title, response.body.title);
      })
      .end();
    done();
  });

  it("should update a post", function *(done) {
    newPost = new Post({ title: "A New Post" });
    let savedPost = yield newPost.save();
    yield request
      .put("/api/post/" + savedPost.id)
      .send({ title: "Updated Post Title"  })
      .expect(200)
      .expect("Location",  /^\/api\/post\/[a-zA-Z0-9-_]{36}$/)
      .expect(function(response) {
        assert.equal(response.body.title, "Updated Post Title");
      })
      .end();
    done();
  });

  it("should delete a post", function *(done) {
    newPost = new Post({ title: "A New Post" });
    let savedPost = yield newPost.save();
    yield request
      .delete("/api/post/" + savedPost.id)
      .expect(204)
      .end();
    done();
  });
});
