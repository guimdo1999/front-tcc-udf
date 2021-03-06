import * as backEndUtils from "./BackEnd";

export const insertDisciplina = async (dados) => {
  const registrar_disciplina = {
    nome_disciplina: dados.nome_disciplina,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/disciplina", registrar_disciplina)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getDisciplina = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/disciplina")
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const putDisciplinaId = async (id, dados) => {
  const update_disciplina = {
    nome_disciplina: dados.nome_disciplina,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/disciplina/" + id, update_disciplina)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteDisciplina = async (id) => {
  return await backEndUtils
    .chamarBackEnd("delete", "/api/disciplina/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
