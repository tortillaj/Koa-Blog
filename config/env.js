"use strict";

const apiConfig       = require("./api");
const appEnvironments = {
  development: {
    cacheTime: 60 * 60 * 1000,
    rethinkdb: {
      host: "localhost",
      port: 28015,
      db: "koaBlog"
    }
  },
  production: {
    cacheTime: 7 * 24 * 60 * 60 * 1000,
    rethinkdb: {
      host: "localhost",
      port: 28015,
      db: "koaBlog"
    }
  },
  test: {
    cacheTime: 1000,
    rethinkdb: {
      host: "localhost",
      port: 28015,
      db: "koaBlogTest"
    }
  }
};

module.exports =  appEnvironments[apiConfig.env];
