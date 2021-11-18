import * as backEndUtils from "./BackEnd";

export const insertTipo_ensino = async (dados) => {
  const registrar_tipo_ensino = {
    nome_tipo_ensino: dados.nome_tipo_ensino,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/tipo_ensino", registrar_tipo_ensino)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
export const putTipo_ensino = async (id, dados) => {
  const update_tipo_ensino = {
    nome_tipo_ensino: dados.nome_tipo_ensino,
    is_active: dados.is_active,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/tipo_ensino/" + id, update_tipo_ensino)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getTipo_ensino = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/tipo_ensino")
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteTipo_ensino = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", `/api/tipo_ensino/${id}`)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
