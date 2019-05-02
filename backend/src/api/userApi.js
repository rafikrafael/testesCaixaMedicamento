const { doLogin } = require('../controllers/usuarioController');

module.exports = (server) => {
  
  server.post('/login', async (req, res) => {
    const { email, senha, permaneceLogado = false } = req.body;
    try {
      const retorno = await doLogin(email, senha, permaneceLogado);
      return res.json(retorno)        
    } catch (error) {
      return res.json(error)
    }
  });

}