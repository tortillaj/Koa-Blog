import api from "../api";
import config from "../config";
import thinky from "../api/thinky";
import Post from "../api/post/model";

import assert from "assert";

require('co-mocha');

const request = require('co-supertest').agent(api.listen(3010));
const r = thinky.r;

describe("Post Model -- ", function() {
  let newPost = {};

  before(function *() {
    let tableList = yield r.tableList();
    if (!tableList.includes("Post")) {
      yield r.tableCreate("Post").run();
    }
    let dummy = new Post({ title: "Dummy" });
  });

  beforeEach(function *() {
    newPost = { title: "A New Post" };
    yield r.table("Post").delete().run();
  });

  afterEach(function *() {
    yield r.table("Post").delete().run();
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
