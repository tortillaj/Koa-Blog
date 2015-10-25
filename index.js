require("babel/register");

const config = require('./config');
const api = require('./api');

api.listen(config.koa.port);
