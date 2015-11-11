const thinky = require('./thinky');
require('./post/model.js')(thinky);
require('./user/model.js')(thinky);
require('./file/model.js')(thinky);

module.exports = {
  models: thinky.models,
  r: thinky.r
};
