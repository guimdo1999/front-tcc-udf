import * as backEndUtils from "./BackEnd";

export const insertProfessor = async (dados) => {
  const registrar_professor = {
    nome_professor: dados.nome_professor,
    qtd_horas_trabalho: dados.qtd_horas_trabalho,
    email_professor: dados.email_professor,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/professor", registrar_professor)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getProfessor = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/professor")
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
export const getProfessorId = async (id) => {
  return await backEndUtils
    .chamarBackEnd("GET", `/api/professor/${id}`)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const putProfessorId = async (id, dados) => {
  const update_professor = {
    nome_professor: dados.nome_professor,
    qtd_horas_trabalho: dados.qtd_horas_trabalho,
    email_professor: dados.email_professor,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/professor/" + id, update_professor)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteProfessor = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", `/api/professor/${id}`)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
