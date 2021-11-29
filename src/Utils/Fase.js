import * as backEndUtils from "./BackEnd";

export const insertFase = async (dados) => {
  const registrar_fase = {
    nome_fase: dados.nome_fase,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/fase", registrar_fase)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getFase = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/fase")
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const getFaseId = async (req) => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/fase/" + req)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const putFaseId = async (id, dados) => {
  const update_fase = {
    nome_fase: dados.nome_fase,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/fase/" + id, update_fase)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteFase = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/fase/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
