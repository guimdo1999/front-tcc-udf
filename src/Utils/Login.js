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

export const putUsuario = async (id, data) => {
  const usuario = {
    id: id,
    cod_login: data.cod_login,
    cod_senha: data.cod_senha,
    cod_perfil: data.cod_perfil,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/" + id, usuario)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getMe = async () => {
  return await backEndUtils.chamarBackEnd("GET", "/me").then((resposta) => {
    return resposta.json().then((data) => data);
  });
};

export const getUsuarios = async () => {
  return await backEndUtils.chamarBackEnd("GET", "/").then((resposta) => {
    return resposta.json().then((data) => data);
  });
};

export const deleteUsuario = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
