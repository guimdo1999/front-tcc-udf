import * as backEndUtils from "./BackEnd";

export const insertAluno = async (dados) => {
  const registrar_aluno = {
    nome_aluno: dados.nome_aluno,
    data_nascimento: dados.data_nascimento,
    cod_sexo: dados.cod_sexo,
    matricula: dados.matricula,
    email_aluno: dados.email_aluno,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/aluno", registrar_aluno)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getAluno = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/aluno")
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
export const getAlunoId = async (req) => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/aluno/" + req)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const putAlunoId = async (id, dados) => {
  const update_aluno = {
    nome_aluno: dados.nome_aluno,
    data_nascimento: dados.data_nascimento,
    cod_sexo: dados.cod_sexo,
    matricula: dados.matricula,
    email_aluno: dados.email_aluno,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/aluno/" + id, update_aluno)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteAluno = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/aluno/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
