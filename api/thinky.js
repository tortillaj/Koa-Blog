const config  = require("../config");
const thinky  = require("thinky")(config.env.rethinkdb);

export default thinky;
