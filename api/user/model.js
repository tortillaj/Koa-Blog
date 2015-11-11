"use strict";

module.exports = function(thinky) {
  const type = thinky.type;

  const User = thinky.createModel("User", {
    id: type.string(),
    firstName: type.string(),
    lastName: type.string(),
    displayName: type.string().default(function () {
      return this.firstName + ' ' + this.lastName;
    }),
    email: type.string(),
    website: type.string(),
    createdAt: type.date().default(function () {
      return Date.now();
    }),
    updatedAt: type.date().default(function () {
      return Date.now();
    })
  });

  User.ensureIndex("firstName");

  User.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
  });

  User.defineRelationships = function() {
    User.hasMany(thinky.models.Post, "posts", "id", "idAuthor");
  };
};