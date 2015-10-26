import api from "../../api";
import config from "../../config";
import thinky from "../thinky";
import Post from "./model";

import assert from "assert";

require('co-mocha');

const request = require('co-supertest').agent(api.listen(config.koa.port));
const r = thinky.r;

describe("Post Model -- ", function() {
  let newPost = {};

  beforeEach(function *() {
    newPost = { title: "A New Post" };
    yield r.table("Post").delete();
  });

  afterEach(function *() {
    yield r.table("Post").delete();
  });

  it("a new post is instantiated as an object", function *() {
    let post = new Post(newPost);
    assert.equal(typeof post, "object");
  });

  it("should store properties sent to it upon instantiation", function *() {
    let post = new Post(newPost);
    assert.equal(newPost.title, post.title);
  });

  it("should create a post with properties matching the POSTed object", function *() { 
    let post = new Post(newPost);
    yield request
      .post("/api/post/")
      .send(post)
      .expect(201)
      .expect("Location",  /^\/api\/post\/[a-zA-Z0-9-_]{36}$/)
      .expect(function(response) {
        assert.equal(response.body.title, post.title);
      })
      .end();
  });

  it("should fetch a post by id", function *() {
    let post = new Post(newPost);
    let savedPost = yield post.save();
    yield request
      .get("/api/post/" + savedPost.id)
      .expect(200)
      .expect("Location",  /^\/api\/post\/[a-zA-Z0-9-_]{36}$/)
      .expect(function(response) {
        assert.equal(savedPost.title, response.body.title);
      })
      .end();
  });

  it("should update a post", function *() {
    let post = new Post(newPost);
    let savedPost = yield post.save();
    yield request
      .put("/api/post/" + savedPost.id)
      .send({ title: "Updated Post Title"  })
      .expect(200)
      .expect("Location",  /^\/api\/post\/[a-zA-Z0-9-_]{36}$/)
      .expect(function(response) {
        assert.equal(response.body.title, "Updated Post Title");
      })
      .end();
  });

  it("should delete a post", function *() {
    let post = new Post(newPost);
    let savedPost = yield post.save();
    yield request
        .delete("/api/post/" + savedPost.id)
        .expect(204)
        .end();
    });
});
