const jsonwebtoken = require("jsonwebtoken");
const { JWT_SECRET } = require('../config/enviroments');
const usuarioController = require('../controllers/usuarioController');

const checkJwtToken = async (context, token, next) => {
  const usuario = await usuarioController.getDadosUsuarioLogado(token);
  if (usuario) {
    context.authUsuario = usuario;
  }
  else {
    const err = new Error('Unauthorized! Token inválido!');
    err.status = 400;
    return next(err);
  }
  ;
  if (token !== usuario.ultimoToken) throw new Error('Unauthorized! Token inválido!');
  const options = {
    ignoreExpiration: usuario.permaneceLogado === true,
  };
  jsonwebtoken.verify(token, JWT_SECRET, options, (err, decoded) => {
    if (err) {
      const err = new Error('Unauthorized! Token inválido!');
      err.status = 400;
      return next(err);
    }
    return next();
  });
}

exports.checkJwtToken = checkJwtToken;

exports.validaJwtMiddleware = () => {
  return async (req, res, next) => {
    let authorization = req.get('authorization');
    let token = authorization ? authorization.split(' ')[1] : undefined;
    if (!token) {
      const err = new Error('Unauthorized! Token não enviado!');
      err.status = 400;
      return next(err);
    }
    req.context = {};
    req.context.authorization = authorization;
    return checkJwtToken(req.context, token, next);
    // const usuario = await usuarioController.getDadosUsuarioLogado(token);
    // if (usuario) {
    //   req.context.authUsuario = usuario;
    // }
    // else {
    //   const err = new Error('Unauthorized! Token inválido!');
    //   err.status = 400;
    //   return next(err);
    // }
    // ;
    // if (token !== usuario.ultimoToken) throw new Error('Unauthorized! Token inválido!');
    // const options = {
    //   ignoreExpiration: usuario.permaneceLogado === true,
    // };
    // jsonwebtoken.verify(token, JWT_SECRET, options, (err, decoded) => {
    //   if (err) {
    //     const err = new Error('Unauthorized! Token inválido!');
    //     err.status = 400;
    //     return next(err);
    //   }
    //   return next();
    // });
  };
};
