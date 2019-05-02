const cors = require('../middlewares/cors');

const userApi = require('../api/userApi');
const indexRoute = require('./indexRoute');
const pingRoute = require('./ping');

function configRoutes(server) {
  server.use(cors.all);
  pingRoute(server)
  userApi(server);
  indexRoute(server);
}

exports.configRoutes = configRoutes;