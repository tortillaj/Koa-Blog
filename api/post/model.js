"use strict";

module.exports = function(thinky) {
  const type = thinky.type;

  const Post = thinky.createModel("Post", {
    id: type.string(),
    idAuthor: type.string(),
    title: type.string().default("New Post at " + Date.now()).required(),
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

  Post.defineRelationships = function() {
    Post.belongsTo(thinky.models.User, "author", "idAuthor", "id");
  };
};