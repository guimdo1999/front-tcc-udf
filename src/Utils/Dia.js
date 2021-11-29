import * as backEndUtils from "./BackEnd";

export const insertDia = async (dados) => {
  const registrar_dia = {
    nome_dia: dados.nome_dia,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/dia", registrar_dia)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getDia = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/dia")
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const getDiaId = async (req) => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/dia/" + req)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const putDiaId = async (id, dados) => {
  const update_dia = {
    nome_dia: dados.nome_dia,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/dia/" + id, update_dia)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteDia = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/dia/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
