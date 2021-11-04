import * as backEndUtils from "./BackEnd";

export const register = async (
  nome_professor,
  qtd_horas_trabalho,
  matricula,
  telefone,
  email_professor
) => {
  const registrar_professor = {
    nome_professor: nome_professor,
    qtd_horas_trabalho: qtd_horas_trabalho,
    matricula: matricula,
    telefone: telefone,
    email_professor: email_professor,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/create", registrar_professor)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const login = async (nome_professor, qtd_horas_trabalho) => {
  const usuario = { nome_professor: nome_professor, cod_senha: cod_senha };
  return await backEndUtils
    .chamarBackEnd("POST", "/login", usuario)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
/* export const logout = async () => {
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
}; */
