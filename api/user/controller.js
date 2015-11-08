"use strict";

const User      = require("./model");
const thinky    = require("../thinky");
const r         = thinky.r;
const handle    = require("../handlers");
const baseUrl   = "/api/user/";

const user = {
  list: function *() {
    try {
      this.body = yield User.orderBy({index: r.desc("firstName")});
      this.status = 200;
    } catch(err) {
      handle.error(err);
    }
  },
  get: function *() {
    try {
      let user = yield User.get(this.params.id);
      this.body = user;
      this.set("Location", baseUrl + this.params.id);
      this.status = 200;
    } catch(err) {
      handle.error(err);
    }
  },
  create: function *() {
    try {
      let newUser = new User(this.request.body);
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
      let user = yield User.get(this.params.id);
      this.body = yield user.merge(data).save();
      this.set("Location", baseUrl + this.params.id);
      this.status = 200;
    } catch (err) {
      handle.error(err);
    } 
  },
  delete: function *() {
    try {
      let deleted = yield User.get(this.params.id).delete();
      this.status = 204;
    } catch (err) {
      handle.error(err);
    }
  }
};

module.exports = user;
