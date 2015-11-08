"use strict";

const config    = require("../../config");
const thinky    = require("../thinky");
const r         = thinky.r;
const type      = thinky.type;

const Post = thinky.createModel("Post", {
  id: type.string(),
  title: type.string().default("New Post at " + Date.now()),
  slug: type.string(),
  body: type.string(),
  createdAt: type.date().default(function() { return Date.now(); }),
  updatedAt: type.date().default(function() { return Date.now(); })
});

Post.ensureIndex("title");
Post.ensureIndex("slug");
Post.ensureIndex("createdAt");
Post.pre("save", function(next) {
  this.updatedAt = Date.now();
  if (this.title) {
    this.slug = this.title.replace(/[^A-Za-z0-9_]/ig, "-").toLowerCase();
  }
  next();
});

module.exports = Post;
