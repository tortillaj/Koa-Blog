"use strict";

const Models    = require("../models");
const handle    = require("../handlers");
const baseUrl   = "/api/user/";

const user = {
  list: function *(next) {
    try {
      this.body = yield Models.models.User.orderBy({index: Models.r.desc("firstName")});
      this.set("Location", baseUrl);
      this.status = 200;
    } catch(err) {
      handle.error(err);
    }
    yield next;
  },
  get: function *() {
    try {
      let user = yield Models.models.User.get(this.params.id);
      this.body = user;
      this.set("Location", baseUrl + this.params.id);
      this.status = 200;
    } catch(err) {
      handle.error(err);
    }
  },
  create: function *() {
    try {
      let newUser = new Models.models.User(this.request.body);
      this.body = yield newUser.save();
      this.set("Location", baseUrl + this.body.id);
      this.status = 201;
    } catch(err) {
      handle.error(err);
    }
  },
  update: function *() {
    try {
      let data = this.request.body;
      let user = yield Models.models.User.get(this.params.id);
      this.body = yield user.merge(data).save();
      this.set("Location", baseUrl + this.params.id);
      this.status = 200;
    } catch (err) {
      handle.error(err);
    } 
  },
  delete: function *() {
    try {
      let deleted = yield Models.models.User.get(this.params.id).delete();
      this.status = 204;
    } catch (err) {
      handle.error(err);
    }
  }
};

module.exports = user;
