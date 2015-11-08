"use strict";

const Post      = require("./model");
const thinky    = require("../thinky");
const r         = thinky.r;
const baseUrl   = "/api/post/";

const post = {
  list: function *() {
    try {
      this.body = yield Post.orderBy({index: r.desc("createdAt")});
      this.status = 200;
    } catch(err) {
      this.body = { error: err };
      this.status = 500;
    }
  },
  get: function *() {
    try {
      let post = yield Post.get(this.params.id);
      if (post) {
        this.body = post;
        this.set("Location", baseUrl + this.params.id);
        this.status = 200;
      } else {
        this.status = 404;
      }
    } catch(err) {
      this.body = { error: err };
      this.status = 500;
    }
  },
  create: function *() {
    try {
      let newPost = new Post(this.request.body);
      this.body = yield newPost.save();
      this.set("Location", baseUrl + this.body.id);
      this.status = 201;
    } catch(err) {
      console.log("ERROR", err);
      this.body = { error: err };
      this.status = 500;
    }
  },
  update: function *() {
    try {
      let data = this.request.body;
      let post = yield Post.get(this.params.id);
      this.body = yield post.merge(data).save();
      this.set("Location", baseUrl + this.params.id);
      this.status = 200;
    } catch (err) {
      this.body = { error: err };
      this.status = 500;
    } 
  },
  delete: function *() {
    try {
      let deleted = yield Post.get(this.params.id).delete();
      this.status = 204;
    } catch (err) {
      this.body = { error: err };
      this.status = 500;
    }
  }
};

module.exports = post;
