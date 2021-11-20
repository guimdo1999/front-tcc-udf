import * as backEndUtils from "./BackEnd";

export const insertEnsino = async (dados) => {
  const registrar_ensino = {
    id_professor: dados.id_professor,
    id_disciplina: dados.id_disciplina,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/ensino", registrar_ensino)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const putEnsino = async (id, dados) => {
  const update_ensino = {
    id_professor: dados.id_professor,
    id_disciplina: dados.id_disciplina,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/ensino/" + id, update_ensino)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getEnsino = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/ensino")
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteEnsino = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/ensino/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
