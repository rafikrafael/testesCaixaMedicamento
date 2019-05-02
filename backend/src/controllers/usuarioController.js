const jsonwebtoken = require('jsonwebtoken');
const db = require('../models');
const { JWT_SECRET } = require('../config/enviroments');

const createLoginToken = (usuario) => {
  const payload = { sub: usuario.id };
  const options = {
      expiresIn: '2h',
  };
  return jsonwebtoken.sign(payload, JWT_SECRET, options);
};

exports.doLogin = async (email, senha, permaneceLogado) => {
  const retorno = {
    status: false,
  };
  let usuario = await db.Usuario.findOne({
      where: {
          [db.Sequelize.Op.and]: { email: email },
      },
      attributes: ['id', 'senha', 'permaneceLogado', 'ultimoToken']
  });
  if (!usuario || !usuario.isSenha(usuario.get('senha'), senha)) {
      retorno.error = 'Usuario ou senha inválidos';
      return retorno;
  }
  const ultimoToken = createLoginToken(usuario);
  await usuario.update({ permaneceLogado, ultimoToken });
  retorno.token = ultimoToken;
  retorno.status = true;
  return retorno;
}

exports.getDadosUsuarioLogado = async (token) => {
  return db.Usuario.findOne({
    where: { ultimoToken: token },
    attributes: ['id', 'email', 'ultimoToken']
  });
}
