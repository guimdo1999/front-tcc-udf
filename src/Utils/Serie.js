import * as backEndUtils from "./BackEnd";

export const insertSerie = async (dados) => {
  const registrar_serie = {
    nome_serie: dados.nome_serie,
    is_active: dados.is_active,
    fk_ano: dados.fk_ano,
    fk_serie: dados.fk_serie,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/serie", registrar_serie)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getSerie = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/serie")
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const getSerieId = async (req) => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/serie/" + req)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const putSerieId = async (id, dados) => {
  const update_serie = {
    nome_serie: dados.nome_serie,
    is_active: dados.is_active,
    fk_ano: dados.fk_ano,
    fk_serie: dados.fk_serie,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/serie/" + id, update_serie)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteSerie = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/serie/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
