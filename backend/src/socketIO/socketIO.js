const { checkJwtToken } = require('../middlewares/valida-jwt.middleware');

module.exports = socketIOConfigure = (io) => {
  io.use(function(socket, next){
    if (socket.handshake.query && socket.handshake.query.token) {
      const { token } = socket.handshake.query;
      socket.context = {};
      checkJwtToken(socket.context, token, next);
    } else {
      next(new Error('Authentication error'));
    }    
  })

  io.on('connection', (socket) => {
    console.log('cliente conectado ao socket io');
    
    socket.emit('setConectado', (socket.context.authUsuario));

    socket.on('valorTeste', (teste) => {
      console.log(teste);
    });

    socket.on('info5sec', (valores) => {
      console.log(`info5sec, socket com id ${socket.id} enviou -> ${valores.data}`);
    });

    setInterval(() => {
      socket.emit('receiveFromServer', {
        data: new Date(),
      })
    }, 5000);
  });
};
