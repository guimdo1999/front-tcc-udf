import * as backEndUtils from "./BackEnd";

export const insertAno = async (dados) => {
  const registrar_ano = {
    nome_ano: dados.nome_ano,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/ano", registrar_ano)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getAno = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/ano")
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const getAnoId = async (req) => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/ano/" + req)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const putAnoId = async (id, dados) => {
  const update_ano = {
    nome_ano: dados.nome_ano,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/ano/" + id, update_ano)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteAno = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/ano/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
