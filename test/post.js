"use strict";

require('co-mocha'); 

const _           = require("lodash");
const api         = require("../api");
const config      = require("../config");
const Models      = require("../api/models");
const assert      = require("assert");
const request     = require('co-supertest').agent(api.listen(3010));

describe("Post Model -- ", function() {
  this.timeout(10000);
  let newPost = {};
  let newPostAuthor = {};

  before(function *(done) {
    //yield Models.User.ready();
    //yield Models.Post.ready();
    done();
  });

  beforeEach(function *(done) {
    newPost = new Models.models.Post({ title: "A New Post" });
    newPostAuthor = new Models.models.User({ firstName: "James", "lastName": "Cole" });
    newPost.author = newPostAuthor;
    yield Models.r.table("Post").delete();
    done();
  });

  afterEach(function *(done) {
    yield Models.r.table("Post").delete();
    done();
  });

  it("a new post is instantiated as an object", function *(done) {
    assert.equal(typeof newPost, "object");
    done();
  });

  it("should store properties sent to it upon instantiation", function *(done) {
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
        assert.equal(response.body.author.firstName, newPostAuthor.firstName);
        assert.equal(response.body.title, newPost.title);
      })
      .end();
    done();
  });

  it("should fetch a post by id", function *(done) {
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

  it("should 404 if a post is not found", function *(done) {
    yield request
      .get("/api/post/123")
      .expect(404)
      .end();
    done();
  });

  it("should update a post", function *(done) {
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
    let savedPost = yield newPost.save();
    yield request
      .delete("/api/post/" + savedPost.id)
      .expect(204)
      .end();
    done();
  });
});
