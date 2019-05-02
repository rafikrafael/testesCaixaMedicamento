const ioClient = require('socket.io-client')
const axios = require('axios');

const hostname = 'http://localhost:3000'

const getToken = async () => {
  return axios.post(`${hostname}/login`, {
    email: 'teste@teste.com',
    senha: '1234'
  });
}

const connectSocketIOServer = async () => {
  const retorno = await getToken();

  if (retorno && retorno.data && retorno.data.status) {
    const { token } = retorno.data;
  
    const socketClient = ioClient.connect(hostname, {
      query: {
        token
      }
    });

    socketClient.removeAllListeners();

    socketClient.on('connect', () => {
      console.log('socket connectado');    
    });
  
    socketClient.on('disconnect', () => {
      console.log('socket desconectado');
    });

    socketClient.on('setConectado', (authUsuario) => {
      console.log(`Cliente conectado ao server com o email ${authUsuario.email}`);
    });

    setInterval(() => {
      socketClient.emit('info5sec', {
        data: new Date()
      })
    }, 5000);

    socketClient.on('receiveFromServer', (value) => {
      console.log(`receiveFromServer ${value.data}`);
      
    })
  }
}

connectSocketIOServer();

