global.appDir = __dirname;

const factoryServer = require('./src/factory/serverFactory');
const db = require('./src/models');

db.sequelize.sync({ alter: false, hooks: true })
  .then(() => {
    factoryServer.startServer();
})
