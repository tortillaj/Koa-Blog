"use strict";

const Models = require("../models");
const handle = require("../handlers");
const baseUrl = "/api/file/";

const file = {
  list: function *() {
    try {
      this.body = yield Models.model.File.orderBy({index: r.desc("createdAt")});
      this.set("Location", baseUrl);
      this.status = 200;
    } catch (err) {
      handle.error(err);
    }
  },
  get: function *() {
    try {
      this.body = yield Models.model.File.get(this.params.id);
      this.set("Location", baseUrl + this.params.id);
      this.status = 200;
    } catch (err) {
      handle.error(err);
    }
  },
  create: function *() {
    try {
      let newFile = new Models.model.File(this.request.body);
      this.body = yield newFile.save();
      this.set("Location", baseUrl + this.body.id);
      this.status = 201;
    } catch (err) {
      handle.error(err);
    }
  },
  delete: function *() {
    try {
      let deleted = yield Models.model.File.get(this.params.id).delete();
      this.status = 204;
    } catch (err) {
      handle.error(err);
    }
  }
};

module.exports = file;