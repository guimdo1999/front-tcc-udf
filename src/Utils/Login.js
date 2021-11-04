import * as backEndUtils from "./BackEnd";

export const register = async (cod_login, cod_senha, cod_perfil) => {
  const registrar_usuario = {
    cod_login: cod_login,
    cod_senha: cod_senha,
    cod_perfil: cod_perfil,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/register", registrar_usuario)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const login = async (cod_login, cod_senha) => {
  const usuario = { cod_login: cod_login, cod_senha: cod_senha };
  return await backEndUtils
    .chamarBackEnd("POST", "/login", usuario)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
export const logout = async () => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/logout")
    .then(() => {
      return console.log("Deslogado!");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getMe = async () => {
  return await backEndUtils.chamarBackEnd("GET", "/me").then((resposta) => {
    return resposta.json().then((data) => data);
  });
};
