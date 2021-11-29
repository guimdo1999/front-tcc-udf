import * as backEndUtils from "./BackEnd";

export const insertAula = async (dados) => {
  const registrar_aulas = {
    nome_aula: dados.nome_aula,
    is_active: dados.is_active,
    fk_professor: dados.fk_professor,
    fk_materia: dados.fk_materia,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/aula", registrar_aulas)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getAula = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/aula")
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const getAulaId = async (id) => {
  return await backEndUtils
    .chamarBackEnd("GET", `/api/aula/${id}`)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const putAulaId = async (id, dados) => {
  const update_aulas = {
    nome_aula: dados.nome_aula,
    is_active: dados.is_active,
    fk_professor: dados.fk_professor,
    fk_materia: dados.fk_materia,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/aula/" + id, update_aulas)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteAula = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", `/api/aula/${id}`)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
