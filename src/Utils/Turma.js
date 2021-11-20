import * as backEndUtils from "./BackEnd";

export const insertTurma = async (dados) => {
  const registrar_turma = {
    nome_turma: dados.nome_turma,
    ano_turma: dados.ano_turma,
    qtd_meses: dados.qtd_meses,
    tipo_de_calendario: dados.tipo_de_calendario,
    id_turno: dados.id_turno,
    id_tipo_ensino: dados.id_tipo_ensino,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/turma", registrar_turma)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
export const putTurma = async (id, dados) => {
  const update_turma = {
    nome_turma: dados.nome_turma,
    ano_turma: dados.ano_turma,
    qtd_meses: dados.qtd_meses,
    tipo_de_calendario: dados.tipo_de_calendario,
    id_turno: dados.id_turno,
    id_tipo_ensino: dados.id_tipo_ensino,
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
      return resposta.json().then((data) => data);
    });
};
export const deleteTurma = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/turma/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
