const path = require('path');
const { validaJwtMiddleware } = require('../middlewares/valida-jwt.middleware');

module.exports = (server) => {
  
  server.get('/ping', (req, res) => {
    res.json({
      status: true
    });
  });

  server.get('/pingAutorizado', validaJwtMiddleware(), (req, res) => {
    res.json({
      usuario: req.context.authUsuario.email,
      status: true
    });
  });
  
}
