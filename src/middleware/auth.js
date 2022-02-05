const jwt = require("jsonwebtoken");

// status code 401 means unauthorized
const secret = 'test';

const auth = (req, res, next) => {
  try {
    // verificando x-auth-token com nosso token jwt
    const token = req.header("x-auth-token");
    
    if (!token) {
      return res
        .status(401)
        .json({ msg: "Nenhum token de autenticação, autorização negada." });
    }
    //Pegando o token jwt, passando nosso secret e verificando se ele está de acordo com nosso usuário que selecionamos
    const verified = jwt.verify(token,secret);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "A verificação do token falhou, autorização negada." });
    }
    req.user = verified.id;
    next();
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

module.exports = auth;
