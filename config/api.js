const path = require('path');

export default {
  root: path.normalize(__dirname + '/../'),
  env: process.env.NODE_ENV || 'development',
  secret: process.env.SECRET || 'CHANGE ME' /* for signing JWT */
}
