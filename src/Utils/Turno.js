import * as backEndUtils from "./BackEnd";

export const insertTurno = async (dados) => {
  const registrar_aluno = {
    nome_turno: dados.nome_turno,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/turno", registrar_aluno)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getTurno = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/turno")
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
export const getTurnoId = async (req) => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/turno/" + req)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const putTurnoId = async (id, dados) => {
  const update_turno = {
    nome_turno: dados.nome_turno,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/turno/" + id, update_turno)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteTurno = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/turno/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
