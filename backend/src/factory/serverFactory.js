const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const routesConfigure = require('../routes/routesConfigure');
const enviroments = require('../config/enviroments');
const socketIOConfigure = require('../socketIO/socketIO');

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server);

app.use(express.static(path.join(global.appDir, 'client','build')));
app.use('/static', express.static(path.join(global.appDir, 'client', 'build', 'static')));

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
}));

app.use(bodyParser.json({
  limit: '50mb',
}));

exports.startServer = () => {
  routesConfigure.configRoutes(app);
  
  socketIOConfigure(io);

  server.listen(enviroments.serverPort);
  console.log(`Servidor ativo na porta ${enviroments.serverPort}`);
  
}
