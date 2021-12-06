import * as backEndUtils from "./BackEnd";

export const insertMateria = async (dados) => {
  const registrar_materia = {
    nome_materia: dados.nome_materia,
    is_active: dados.is_active,
    qtd_materia: dados.qtd_materia,
    fk_disciplina: dados.fk_disciplina,
    fk_serie: dados.fk_serie,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/materia", registrar_materia)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getMateria = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/materia")
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const getMateriaId = async (req) => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/materia/" + req)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const putMateriaId = async (id, dados) => {
  const update_materia = {
    nome_materia: dados.nome_materia,
    is_active: dados.is_active,
    qtd_materia: dados.qtd_materia,
    fk_disciplina: dados.fk_disciplina,
    fk_serie: dados.fk_serie,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/materia/" + id, update_materia)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteMateria = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/materia/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
