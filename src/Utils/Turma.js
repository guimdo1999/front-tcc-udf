import * as backEndUtils from "./BackEnd";

export const insertTurma = async (dados) => {
  const registrar_turma = {
    nome_turma: dados.nome_turma,
    data_inicio: dados.data_inicio,
    data_fim: dados.data_fim,
    fk_serie: dados.fk_serie,
    fk_turno: dados.fk_turno,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/turma", registrar_turma)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
export const putTurmaId = async (id, dados) => {
  const update_turma = {
    nome_turma: dados.nome_turma,
    data_inicio: dados.data_inicio,
    data_fim: dados.data_fim,
    fk_serie: dados.fk_serie,
    fk_turno: dados.fk_turno,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/turma/" + id, update_turma)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getTurma = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/turma")
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
export const deleteTurma = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/turma/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
