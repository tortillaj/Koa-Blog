"use strict";

const env = require("./env");
module.exports = {
  port: process.env.PORT || 3000,
  cors: {
    maxAge: env.cacheTime / 1000,
    credentials: true,
    methods: "GET, HEAD, OPTIONS, PUT, POST, DELETE",
    headers: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  }
};
