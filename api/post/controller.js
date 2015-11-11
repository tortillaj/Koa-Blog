"use strict";

const Models    = require("../models");
const handle    = require("../handlers");
const baseUrl   = "/api/post/";

const post = {
  list: function *() {
    try {
      this.body = yield Models.models.Post.orderBy({index: Models.r.desc("createdAt")});
      this.set("Location", baseUrl);
      this.status = 200;
    } catch(err) {
      handle.error(err);
    }
  },
  get: function *() {
    try {
      let post = yield Models.models.Post.get(this.params.id);
      this.body = post;
      this.set("Location", baseUrl + this.params.id);
      this.status = 200;
    } catch(err) {
      handle.error(err);
    }
  },
  create: function *() {
    try {
      let newPost = new Models.models.Post(this.request.body);
      this.body = yield newPost.save();
      this.set("Location", baseUrl + this.body.id);
      this.status = 201;
    } catch(err) {
      handle.error(err);
    }
  },
  update: function *() {
    try {
      let data = this.request.body;
      let post = yield Models.models.Post.get(this.params.id);
      this.body = yield post.merge(data).save();
      this.set("Location", baseUrl + this.params.id);
      this.status = 200;
    } catch (err) {
      handle.error(err);
    } 
  },
  delete: function *() {
    try {
      let deleted = yield Models.models.Post.get(this.params.id).delete();
      this.status = 204;
    } catch (err) {
      handle.error(err);
    }
  }
};

module.exports = post;
