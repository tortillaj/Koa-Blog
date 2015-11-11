"use strict";

const config  = require("../config");
const thinky  = require("thinky")(config.env.rethinkdb);



module.exports = thinky;
