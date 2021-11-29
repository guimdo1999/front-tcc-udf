import * as backEndUtils from "./BackEnd";

export const insertHorario = async (dados) => {
  const registrar_horario = {
    nome_horario: dados.nome_horario,
    hora_inicio: dados.hora_inicio,
    hora_fim: dados.hora_fim,
    is_active: dados.is_active,
    fk_dia: dados.fk_dia,
    fk_turno: dados.turno,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/horario", registrar_horario)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getHorario = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/horario")
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const putHorarioId = async (id, dados) => {
  const update_horario = {
    nome_horario: dados.nome_horario,
    hora_inicio: dados.hora_inicio,
    hora_fim: dados.hora_fim,
    is_active: dados.is_active,
    fk_dia: dados.fk_dia,
    fk_turno: dados.turno,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/horario/" + id, update_horario)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteHorario = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/horario/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
