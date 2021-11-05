import * as backEndUtils from "./BackEnd";

export const insertTipo_ensino = async (dados) => {
  const registrar_tipo_ensino = {
    nome_tipo_ensino: dados.nome_tipo_ensino,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/tipo_ensino", registrar_tipo_ensino)
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
